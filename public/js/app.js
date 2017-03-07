const express = require('express');
const client = require('cheerio-httpcli');

const app = express();
app.set('view engine', 'jade');

const server = app.listen(3000, () => {
  console.log(`Node.js is listening to PORT:${server.address().port}`);
});

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

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there' });
});

app.get('/api/ogimg/list', (req, res) => {
  Promise.all(URL_LIST.map(url => getMeta(url)))
    .then((results) => {
      const list = results.map(result => ({
        title: result.$('title').eq(0).text(),
        url: result.response.request.href,
        ogimg: result.$('meta[property="og:image"]').attr('content'),
      }));
      res.json(list);
    })
    .catch((err) => {
      console.log(err);
    });
});
