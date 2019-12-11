// get node package dependencies 
const http = require("http");           // serve, handle http requests
const { Pool, Client } = require("pg"); // database interface
const fs = require("fs");               // read files on server (local machine)
const urlpkg = require("url");             // urlpkg parsing

const pool = new Pool({
  user: "postgres",
  host: "localhost", // or 127.0.0.1
  database: "my_spotify",
  password: "postgres",
  port: "5432"
});

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
  const { headers, method, url } = request;
  console.log("Serving a " + method + " request at '" + urlpkg + "'");
  
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

    const responseBody = { headers, method, url, body };
    console.log("Request at urlpkg " + url);

    if (url.search("search") != -1) {
      // this is a db request
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(queryDatabase("SELECT * FROM key_ref"));
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(getFileContent("index.html"));
    }

    // get any queries in URL
    // var query = urlpkg.parse(url, true).query;
    queryDatabase("SELECT * FROM key_ref");
      
  });
}).listen(8080);

console.log("Server running on port 8080 of localhost");

