var dns = require('dns');
http = require('http');

var s = http.Server(function (req, res) {
var query = req.url.replace('/','');

res.writeHead(200);
res.write('query: ' + query + '\n');

dns.resolve(query, function (error, addresses) {
res.end(JSON.stringify(addresses) + '\n');
});
});

s.listen(8000);