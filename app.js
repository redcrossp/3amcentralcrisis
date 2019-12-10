var http = require("http");

http.createServer(function reqHandler(request, response) {
  // send OK (successful connection)
  response.writeHead(200, {"Content-Type": "text/plain"});

  response.end("<h1>Hello World</h1>\n");
}).listen(8081);

console.log("Server running on port 8081 of localhost");

