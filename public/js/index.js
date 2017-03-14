/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var parseText = function parseText(value) {
	  var arr = value.split('\n');
	  return arr;
	};

	var app = new Vue({
	  el: '#ogimgList',
	  data: {
	    ogimgList: []
	  },
	  methods: {
	    fetch: function fetch(e) {
	      e.preventDefault();
	      var request = new XMLHttpRequest();
	      request.open('POST', '/api/ogimg/list', true);
	      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	      request.onload = function () {
	        console.log(request.response);
	        var obj = JSON.parse(request.response);
	        app.ogimgList = obj.ogimgList;
	      };
	      request.onerror = function () {
	        console.log(request);
	      };
	      var textArea = document.getElementById('urls');
	      var urls = parseText(textArea.value);
	      console.log(urls);
	      request.send(JSON.stringify({ urls: urls }));
	    }
	  }
	});

/***/ }
/******/ ]);