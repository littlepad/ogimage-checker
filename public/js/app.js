const express = require('express');
const client = require('cheerio-httpcli');
const bodyParser = require('body-parser');
const app = express();

// テンプレートエンジン設定
app.set('view engine', 'jade');
// 静的ファイル設定
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = app.listen(3000, () => {
  console.log(`Node.js is listening to PORT:${server.address().port}`);
});

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
  res.render('index');
});

app.post('/api/ogimg/list', (req, res) => {
  const urls = req.body.urls;
  Promise.all(urls.map(url => getMeta(url)))
    .then((results) => {
      const list = results.map(result => ({
        title: result.$('title').eq(0).text(),
        url: result.response.request.href,
        ogImg: result.$('meta[property="og:image"]').attr('content'),
        ogDescription: result.$('meta[property="og:description"]').attr('content'),
      }));
      res.json({ ogImgList: list });
    })
    .catch((err) => {
      console.log(err);
    });
});
