Nick Abuzalaf
Joyce Duan
Parker Redcross
Zach Stanik

Detailed Project Proposal

Project idea: We plan to use online data sets from Kaggle containing the top 100 most popular songs from Spotify and their musical features. We plan to supplement these datasets by querying more data from Spotify API to retrieve their most popular songs based on genre so that we can create at least two datasets from which to query. Our web application will be a more robust version of Spotify’s search, allowing for additional parameters to be specified such as mood or occasion (which we will define as our own categories) or more specific features such as musical key or mode.

Data resource: We plan to get our data from Kaggle and the Spotify API. The Kaggle datasets that we will use is the Spotify Audio Features (https://www.kaggle.com/tomigelo/spotify-audio-features) dataset which includes 130k tracks, last updated on April 2019. The attributes listed in this dataset are artist_name, track_id, track_name, acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, time_signature, valence. In addition to this dataset, we plan to query more data from Spotify’s Web API for songs that came out after April 2019. We plan to merge these datasets for our project.

Database schema:
Resources: https://developer.spotify.com/discover/, https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/

Song(	id varchar PRIMARY KEY UNIQUE
track_name varchar, 
artist varchar, 
duration_ms integer
);

Mood(	id varchar PRIMARY KEY UNIQUE, 
key_root integer FOREIGN KEY, 
mode integer FOREIGN KEY, 
tempo decimal, 
danceability decimal, 
energy decimal, 
valence decimal
);

Occasion(	id varchar UNIQUE PRIMARY KEY, 
acousticness decimal, 
danceability decimal, 
energy decimal, 
instrumentalness decimal, 
liveness decimal, 
loudness decimal, 
speechiness decimal, 
valence decimal
);

This table will hold predefined relationships between key_root, mode, and a string giving a detailed representation of key for the purpose of advanced search
Key_Ref(	key_root integer PRIMARY KEY, 
mode integer PRIMARY KEY,
key varchar
);
 
User interface: We’re planning on creating a web application to run on most modern browsers, implemented using React as the frontend framework to streamline design and component production. The design of the application will probably feature an easy to use search interface to query songs from our chosen database and display the results in an intuitive and scrollable way. Our search results would represent generated playlists based on features like mood, occasion (like “Hungry?”, “Picking up your laundry on a Sunday afternoon”, “3am existential crisis”, “2.5 hour car ride”), and other features for which Spotify doesn’t offer as much capability. The search interface will be fully navigable without having to login into Spotify or provide authentication.
	Some additional features we hope to implement include providing a login/authentication protocol for users. This would allow users, upon authentication, to play a preview of each song result through a Spotify widget (accessed through the Spotify API). Additionally, once logged in, users could then save our generated playlists or individual songs from search results into their Spotify account, enhancing their music-listening experience.

Code structure:
We will be programming our project using React and Node.js frameworks. As described above, React will be used to construct the front-end of the website, while Node.js will construct the networking and database access driving the application. We've chosen the frameworks with their integration and to keep language development consistent. We will store our database in postgresql. We will also use Spotify API. To build our project, we will be using git versioning control to collaborate on code. We will also be hosting our website on Ecowebhosting.

Division of work: Zach will primarily handle the front-end development of the web application. Joyce will handle the data cleaning and data querying. Joyce and Nick will work together to store this data in the SQL database. Parker will primarily handle the back-end development. Nick will also micromanage the team and come up with a name for our web application. Of course, all team members will always lend a helping hand when extra help is needed!

Schedule: 

By 11/22 -  Set up the backend and frontend and of our web application to make “Hello World!”. Explore the Kaggle dataset and see what other queries we may need to run. 

By the end of Thanksgiving break - Run extra queries on Spotify API to gather all the data we need. Store this data in a PostgreSQL database. Find a platform on which to host our site. Set up frontend so user can query based on a defined set of moods and occasions, or advanced search by song attributes. 

By  12/4 - Write backend to query our SQL database based on the user’s search parameters and return random playlists to display on the frontend. The bulk is done!

By 12/7 - Add any extra features we want such as Spotify account integration of extra occasions. 

