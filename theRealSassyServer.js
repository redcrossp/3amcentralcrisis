// get node package dependencies 

const { Pool, Client } = require("pg"); // database interface
const exp = require("express")();     // express

const pool = new Pool({
  user: "postgres",
  host: "localhost", // or 127.0.0.1
  database: "my_spotify",
  password: "postgres",
  port: "5432"
});

exp.get('/favicon.ico', (req, res) => res.status(204));

exp.get('/',
  (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

exp.get('/js/vue.js',
  (req, res) => {
    res.sendFile(__dirname + '/js/vue.js');
});

exp.get('/js/index.js',
  (req, res) => {
    res.sendFile(__dirname + '/js/index.js');
});

exp.get('/search',
  async function(req, res) {
    var urlQueries = req.query;
    // console.log(urlQueries);
    var dBQuery = getDBQuery(urlQueries);
    // console.log(urlQueries);
    if (dBQuery == undefined) {
      res.status(204);
      return;
    }

    queryDatabase(dBQuery, res, urlQueries.limit);
});


function queryDatabase(query, response, limit) {
  pool.query(query, (err, res) => {
    limit = limit || 15;

    response.writeHead(200, {'Content-Type': 'application/json'});
    var returnResponse = JSON.stringify(res.rows.splice(0, limit));
    response.end(returnResponse);
  });
}

console.log("Server running on port 8080 of localhost");
exp.listen(8080);













//  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF
//  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF
//  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF
//  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF  SQL STUFF

function getDBQuery(queries) {
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
