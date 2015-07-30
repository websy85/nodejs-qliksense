var http = require('http');
var fs = require('fs');
var urlParser = require('url');
var qlikAuth = require('qlik-auth');

var contentTypeMap = {
  "js":"text/javascript",
  "html":"text/html",
  "css":"text/css",
  "ttf":"font/ttf",
  "ico":"image/x-icon"
};

var server = http.createServer(function(req, res){
  switch(req.url){
    case "/":
      serveFile("public/index.html", res);
      break;
    default:
      if(req.url.indexOf('authenticate?')!=-1){
        var profile = {
          'UserDirectory': 'QLIK',
          'UserId': 'sample',
          'Attributes': []
        }

        var options = {
         'Certificate': './client.pfx',
         'PassPhrase': ''
        }
        qlikAuth.requestTicket(req, res, profile, options);
      }
      else{
        serveFile(req.url.replace(/\//,''), res);
      }
      break;
  }
}).listen(3000);

console.log('Server running on port 3000');

function serveFile(url, res){
  console.log(url.replace(/\//, ''));
  var contentType = contentTypeMap[url.split('.').pop()];
  console.log(contentType);
  fs.readFile(url, function(err, data){
    res.writeHead(200, {'Content-Type':contentType});
    if(contentType=="image/x-icon"){
      res.write(""+data);
    }
    else {
      res.write(data);
    }
    res.end();
  })
}
