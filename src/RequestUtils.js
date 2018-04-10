import axios from "axios";
import _ from "lodash";

function validateData(data) {
  return ["page", "totalCount", "transactions"].every(key => key in data);
}

function parseResponse(response, url, fetchPages) {
  return new Promise((success, failure) => {
    if (!validateData(response)) {
      failure({ error: "Invalid data" });
    }

    let { transactions } = response;
    const { page, totalCount } = response;

    // if fetching more pages and the number of transactions is less than the
    // total transactions fetch transactions on next pages
    if (fetchPages && transactions.length < totalCount) {
      // determine number of pages remaining based on number of transactions
      // received on first page
      const numPages = Math.floor(totalCount / transactions.length) + 1;
      const promises = [];
      for (let i = page + 1; i <= numPages; i++) {
        promises.push(fetchTransactions(url, i, false));
      }

      // resolve all promises for remaining pages and concatenate the result
      Promise.all(promises)
        .then(pageTransactions => {
          success(transactions.concat(_.flatten(pageTransactions)));
        })
        .catch(error => {
          failure(error);
        });
    } else {
      success(transactions);
    }
  });
}

export function fetchTransactions(url, page = 1, fetchPages = true) {
  return new Promise((success, failure) => {
    requestPromise(`${url}/${page}.json`)
      .then(response => {
        parseResponse(response, url, fetchPages).then(transactions => {
          success(transactions);
        });
      })
      .catch(error => {
        failure(error);
      });
  });
}

function requestPromise(url) {
  // make request to API and return a promise with the response
  return new Promise((success, failure) => {
    axios
      .get(url)
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        failure({ error: `Error code: ${error.response.status}` });
      });
  });
}
