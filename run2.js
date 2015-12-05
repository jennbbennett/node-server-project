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
}).listen(8080);
