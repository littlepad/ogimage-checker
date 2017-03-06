const client = require('cheerio-httpcli');


function getMeta(url) {
  return new Promise((resolve, reject) => {
    client.fetch(url).then((result) => {
      // レスポンスヘッダを参照
      // console.log(result.response.headers);

      // HTMLタイトルを表示
      console.log(result.$('title').eq(0).text());

      // og:imgを表示
      console.log(result.$('meta[property="og:image"]').attr('content'));
    }).catch((err) => {
      console.log(err);
    });
  });
}

getMeta('https://google.co.jp/')
  .then(() => {
    console.log('done');
  }
);
