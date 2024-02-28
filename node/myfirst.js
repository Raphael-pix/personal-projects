var http = require("http");
var url = require('url')
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr,true);
console.log(q)