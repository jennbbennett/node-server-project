var http = require('http');
var url = require('url');
var fs = require('fs');
var port = 8080;


http.createServer(function(req, res) {
  var urlReq = req.url;
  var parsedUrl = url.parse(urlReq, true);
  var fileName = "." + parsedUrl.pathname;
  var query = parsedUrl.query;
  fs.readFile(fileName, 'utf-8', function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    var data2 = JSON.stringify(data).toLowerCase();
    var find = (query.from);
    var re = new RegExp(find, 'g');
    var switchedData2 = data2.replace(re, query.to);
    var servedData = JSON.parse(switchedData2);
    res.writeHead(200);
    res.end(servedData);
  });
}).listen(8080, function(){
  console.log('Server is listening on Port 8080');
});

// another option

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var port = 8080;

var app = http.createServer(function(request, response){
var parsedUrl = url.parse(request.url, true);
fs.readFile(path.join('.', parsedUrl.pathname), 'utf-8', function(err, contents){
  if(err){
    respone.statusCode = 404;
    response.end('404');
    return;
  } else {
    response.statusCode = 200;
    var regex = new RegExp(parsedUrl.query.from, 'gi')
    response.end(contents.replace(regex, parsedUrl.query.to);)
  }
});
});

app.listen(8080, function(){
  console.log('Server is listen on 8080');
});
