// get node package dependencies 
const http = require("http");           // serve, handle http requests
const { Pool, Client } = require("pg"); // database interface
const fs = require("fs");               // read files on server (local machine)
const url = require("url");             // url parsing

/*
const pool = new Pool({
  user: "username",
  host: "localhost", // or 127.0.0.1
  database: "databasename",
  password: "password",
  port: "8080"
});
*/

function getFileContent(filename) {
  try {
    return fs.readFileSync(filename, 'utf8').toString();
  } catch (e) {
    console.log("Error: ", e.stack);
  }
}

function queryDatabase(query) {
  pool.query(query, (err, res) => {
    console.log(err, res);
    pool.end();
  });
}

http.createServer(function reqHandler(request, response) {
  const { headers, method, requrl } = request;
  console.log("Serving a " + method + " request at '" + url + "'");
  
  response.statusCode = 200;
  
  let body = [];
  request.on("error", (err) => {
    console.error(err);
  }).on("data", (chunk) => {
    body.push(chunk);
  }).on("end", () => {
    body = Buffer.concat(body).toString();

    response.on("error", (err) => {
      console.error(err);
    });

    // get any queries in URL
    var query = url.parse(requrl, true).query;

    response.writeHead(200, {"Content-Type": "text/html"})l

    const responseBody = { headers, method, url, body };

    response.end(JSON.stringify(responseBody))
  });
}).listen(8080);

console.log("Server running on port 8080 of localhost");

