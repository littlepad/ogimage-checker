const btn = document.getElementById('sendBtn');
btn.onclick = () => {
  const request = new XMLHttpRequest();
  request.open('POST', '/api/ogimg/list', true);
  request.onload = () => {
    console.log(request.response);
  };
  request.onerror = () => {
    console.log(request);
  };
  request.send(null);
};
