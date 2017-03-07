const request = new XMLHttpRequest();
request.open('GET', '/api/ogimg/list', true);
request.onload = () => {
  console.log(request.response);
};
request.onerror = () => {
  cosole.log(request);
};
request.send(null);
//request.send('q=ajax&date=10');

