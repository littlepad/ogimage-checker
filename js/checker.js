const client = require('cheerio-httpcli');

const URL_LIST = [
  'http://www.yahoo.co.jp/',
  'https://google.co.jp/',
  'http://www.apple.com/jp/',
];

function getMeta(url) {
  return new Promise((resolve, reject) => {
    client.fetch(url).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}

function outputResult(results) {
  results.map((result) => {
    // HTMLタイトルを表示
    console.log(result.$('title').eq(0).text());
    // URLを表示
    console.log(result.response.request.href);
    // og:imgを表示
    console.log(result.$('meta[property="og:image"]').attr('content'));
  });
}

Promise.all(URL_LIST.map(url => getMeta(url)))
  .then((results) => {
    outputResult(results);
  })
  .catch((err) => {
    console.log(err);
  });
