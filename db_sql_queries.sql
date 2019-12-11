/* Search by name */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song.track_name LIKE '%_____%'
ORDER BY song_features.popularity DESC;

/* Search by artist */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song.artist LIKE "%_____%" 
ORDER BY song_features.popularity DESC;

/* Search by key */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features, Key_Ref
WHERE song.id = song_features.id AND Key_Ref.key = _____ AND Key_Ref.key_root = song_features.key_root AND Key_Ref.mode = song_features.mode
ORDER BY song_features.popularity DESC;

/* Search by slow tempo */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.tempo > 30 AND song_features.tempo <= 100
ORDER BY song_features.popularity DESC;

/* Search by medium tempo */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.tempo > 100 AND song_features.tempo <= 180
ORDER BY song_features.popularity DESC;

/* Search by fast tempo */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.tempo > 180 AND song_features.tempo <= 250
ORDER BY song_features.popularity DESC;

/* Search by low acousticness */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.acousticness > 0 AND song_features.acousticness <= .3
ORDER BY song_features.popularity DESC;

/* Search by medium acousticness */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.acousticness > .3 AND song_features.acousticness <= .6
ORDER BY song_features.popularity DESC;

/* Search by high acousticness */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.acousticness > .6 AND song_features.acousticness <= 1
ORDER BY song_features.popularity DESC;

/* Search by low danceability */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.danceability > 0 AND song_features.danceability <= .3
ORDER BY song_features.popularity DESC;

/* Search by medium danceability */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.danceability > .3 AND song_features.danceability <= .6
ORDER BY song_features.popularity DESC;

/* Search by high danceability */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.danceability > .6 AND song_features.danceability <= 1
ORDER BY song_features.popularity DESC;

/* Search by low energy */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.energy > 0 AND song_features.energy <= .3
ORDER BY song_features.popularity DESC;

/* Search by medium energy */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.energy > .3 AND song_features.energy <= .6
ORDER BY song_features.popularity DESC;

/* Search by high energy */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.energy > .6 AND song_features.energy <= 1
ORDER BY song_features.popularity DESC;

/* Search by low loudness */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.loudness > 0 AND song_features.loudness <= .3
ORDER BY song_features.popularity DESC;

/* Search by medium loudness */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.loudness > .3 AND song_features.loudness <= .6
ORDER BY song_features.popularity DESC;

/* Search by high loudness */
SELECT song.track_name, song.artist, song.duration_ms
FROM song, song_features
WHERE song.id = song_features.id AND song_features.loudness > .6 AND song_features.loudness <= 1
ORDER BY song_features.popularity DESC;
