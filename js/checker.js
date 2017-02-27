const client = require('cheerio-httpcli');

// callbackを指定しなかったのでPromiseオブジェクトが返る
const p = client.fetch('https://tolot.com/');
p.then((result) => {
  // レスポンスヘッダを参照
  // console.log(result.response.headers);

  // HTMLタイトルを表示
  console.log(result.$('title').eq(0).text());

  // og:imgを表示
  console.log(result.$('meta[property="og:image"]').attr('content'));
});

p.catch((err) => {
  console.log(err);
});

p.finally(() => {
  console.log('done');
});
