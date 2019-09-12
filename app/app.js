const express = require('express');
const client = require('cheerio-httpcli');
const bodyParser = require('body-parser');

const app = express();

// テンプレートエンジン設定
app.set('view engine', 'jade');
app.set('views', './app/views');
// 静的ファイル設定
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(3000, () => {
  /* eslint-disable no-console */
  console.log(`Node.js is listening to PORT:${server.address().port}`);
  /* eslint-enable no-console */
});

function getMeta(url) {
  return new Promise((resolve) => {
    client.fetch(url).then((result) => {
      resolve(result);
    }).catch((err) => {
      resolve(err);
    });
  });
}

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/ogimg/list', (req, res) => {
  // 不要な空白行を除去
  const urls = req.body.urls.filter((url) => (url !== ''));

  Promise.all(urls.map((url) => getMeta(url)))
    .then((results) => {
      const list = results.map((result) => {
        if (result instanceof Error) {
          return {
            title: 'Not Found',
            url: result.url,
            ogImg: '',
            ogDescription: '',
          };
        }
        return {
          title: result.$('title').eq(0).text(),
          url: result.response.request.href,
          ogImg: result.$('meta[property="og:image"]').attr('content'),
          ogDescription: result.$('meta[property="og:description"]').attr('content'),
        };
      });
      res.json({ ogImgList: list });
    })
    .catch((err) => {
      /* eslint-disable no-console */
      console.log(err);
      /* eslint-enable no-console */
    });
});
