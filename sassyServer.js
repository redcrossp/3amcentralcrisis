// get node package dependencies 

const http = require("http");           // serve, handle http requests
const { Pool, Client } = require("pg"); // database interface
const fs = require("fs");               // read files on server (local machine)
const urlpkg = require("url");          // urlpkg parsing
// const express = require("express");     // express

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

function queryDatabase(query, response, limit) {
  pool.query(query, (err, res) => {
    console.log(res);
    
    // response.writeHead(200, {"Content-Type": "application/json"});
    response.setHeader('Content-Type', 'application/json');
    limit = limit || 15;
    var returnResponse = JSON.stringify(res.rows.splice(0, limit));

    response.write(returnResponse);
    response.end();
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
    if (url.search("\\\?") != -1) {
      // this is a db request
      var queries = urlpkg.parse(url, true).query;
      var querystr = getQuery(queries);
      if (querystr == undefined) return;
      queryDatabase(querystr, response, queries.limit);
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(getFileContent(url.substr(1)));
    }

    // queryDatabase("SELECT * FROM key_ref");
  });
}).listen(8080);

console.log("Server running on port 8080 of localhost");













//  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF
//  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF
//  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF
//  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF

function getQuery(queries) {
  const { track, artist, limit, energy, loud, dance, acoustic, tempo, key, mm } = queries;
  var queryStr;

if (track)
/* Search by name */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song.track_name LIKE '%_____%' ORDER BY song_features.popularity DESC;".replace("_____", track);

if (artist)
/* Search by artist */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song.artist LIKE '%_____%' ORDER BY song_features.popularity DESC;".replace("_____", artist);

if (key)
/* Search by key */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features, Key_Ref WHERE song.id = song_features.id AND Key_Ref.key = _____ AND Key_Ref.key_root = song_features.key_root AND Key_Ref.mode = song_features.mode ORDER BY song_features.popularity DESC;".replace("_____", key + " " + mm);

if (tempo == "Slow")
  /* Search by SLow tempo */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.tempo > 30 AND song_features.tempo <= 100 ORDER BY song_features.popularity DESC;";

if (tempo == "Medium")
/* Search by Medium tempo */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.tempo > 100 AND song_features.tempo <= 180 ORDER BY song_features.popularity DESC;";

if (tempo == "Fast")
/* Search by Fast tempo */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.tempo > 180 AND song_features.tempo <= 250 ORDER BY song_features.popularity DESC;";

if (acoustic == "Low")
/* Search by Low acousticness */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.acousticness > 0 AND song_features.acousticness <= .3 ORDER BY song_features.popularity DESC;";

if (acoustic == "Medium")
/* Search by Medium acousticness */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.acousticness > .3 AND song_features.acousticness <= .6 ORDER BY song_features.popularity DESC;";

if (acoustic == "High")
/* Search by High acousticness */
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.acousticness > .6 AND song_features.acousticness <= 1 ORDER BY song_features.popularity DESC;";

/* Search by Low danceability */
if (dance == "Low")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.danceability > 0 AND song_features.danceability <= .3 ORDER BY song_features.popularity DESC;";

/* Search by Medium danceability */
if (dance == "Medium")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.danceability > .3 AND song_features.danceability <= .6 ORDER BY song_features.popularity DESC;";

/* Search by High danceability */
if (dance == "High")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.danceability > .6 AND song_features.danceability <= 1 ORDER BY song_features.popularity DESC;";

/* Search by Low energy */
if (energy == "Low")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.energy > 0 AND song_features.energy <= .3 ORDER BY song_features.popularity DESC;";

/* Search by Medium energy */
if (energy == "Medium")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.energy > .3 AND song_features.energy <= .6 ORDER BY song_features.popularity DESC;";

/* Search by High energy */
if (energy == "High")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.energy > .6 AND song_features.energy <= 1 ORDER BY song_features.popularity DESC;";

/* Search by Low loudness */
if (loud == "Low")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.loudness > 0 AND song_features.loudness <= .3 ORDER BY song_features.popularity DESC;";

/* Search by Medium loudness */
if (loud == "Medium")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.loudness > .3 AND song_features.loudness <= .6 ORDER BY song_features.popularity DESC;";

/* Search by High loudness */
if (loud == "High")
querystr = "SELECT song.track_name, song.artist, song.duration_ms FROM song, song_features WHERE song.id = song_features.id AND song_features.loudness > .6 AND song_features.loudness <= 1 ORDER BY song_features.popularity DESC;";

return querystr;
}
