const btn = document.getElementById('sendBtn');
const textArea = document.getElementById('urls');

const parseText = (value) => {
  const arr = value.split('\n');
  console.log(arr);
  return arr;
};

btn.onclick = (e) => {
  e.preventDefault();
  const request = new XMLHttpRequest();
  request.open('POST', '/api/ogimg/list', true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.onload = () => {
    console.log(request.response);
  };
  request.onerror = () => {
    console.log(request);
  };
  const urls = parseText(textArea.value);
  request.send(JSON.stringify({ urls }));
};
