CREATE DATABASE my_spotify;

CREATE TABLE song (
	id varchar PRIMARY KEY,
	track_name varchar,
	artist varchar,
	duration_ms integer
);

CREATE TABLE song_features (
	id varchar PRIMARY KEY,
	key_root integer,
	mode integer,
	tempo decimal,
	acousticness decimal,
	danceability decimal,
	energy decimal,
	instrumentalness decimal,
	liveness decimal,
	loudness decimal,
	speechiness decimal,
	valence decimal,
	popularity integer
);

CREATE TABLE Key_Ref (
	key_root integer,
	mode integer,
	key varchar
);

INSERT INTO Key_Ref (key_root, mode, key) VALUES 
	(0, 1, 'C Major'),
	(0, 0, 'C Minor'),
	(1, 1, 'C#/Db Major'),
	(1, 0, 'C#/Db Minor'),
	(2, 1, 'D Major'),
	(2, 0, 'D Minor'),
	(3, 1, 'D#/Eb Major'),
	(3, 0, 'D#/Eb Minor'),
	(4, 1, 'E Major'),
	(4, 0, 'E Minor'),
	(5, 1, 'F Major'),
	(5, 0, 'F Minor'),
	(6, 1, 'F#/Gb Major'),
	(6, 0, 'F#/Gb Minor'),
	(7, 1, 'G Major'),
	(7, 0, 'G Minor'),
	(8, 1, 'G#/Ab Major'),
	(8, 0, 'G#/Ab Minor'),
	(9, 1, 'A Major'),
	(9, 0, 'A Minor'),
	(10, 1, 'A#/Bb Major'),
	(10, 0, 'A#/Bb Minor'),
	(11, 1, 'B Major'),
	(11, 0, 'B Minor'),
	(-1, 1, 'No key detected'),
	(-1, 0, 'No key detected')
;

COPY song FROM '/Users/joyceduan/Desktop/3amcentralcrisis/song.csv' DELIMITER ',' CSV HEADER;
COPY song_features FROM '/Users/joyceduan/Desktop/3amcentralcrisis/song_features.csv' DELIMITER ',' CSV HEADER;