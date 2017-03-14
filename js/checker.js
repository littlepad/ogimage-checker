const textArea = document.getElementById('urls');

const parseText = (value) => {
  const arr = value.split('\n');
  return arr;
};

const app = new Vue({
  el: '#ogimgList',
  data: {
    ogimgList: [],
  },
  methods: {
    fetch: (e) => {
      e.preventDefault();
      const request = new XMLHttpRequest();
      request.open('POST', '/api/ogimg/list', true);
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      request.onload = () => {
        console.log(request.response);
        const obj = JSON.parse(request.response);
        app.ogimgList = obj.ogimgList;
      };
      request.onerror = () => {
        console.log(request);
      };
      const urls = parseText(textArea.value);
      console.log(urls);
      request.send(JSON.stringify({ urls }));
    },
  },
});
