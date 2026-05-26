use("spotify");

print("=== Завдання 1. Explain BEFORE index ===");

const query1 = {
    track_genre: "pop",
    "audio_features.danceability": { $gte: 0.7 }
};

const sort1 = {
    popularity: -1
};

printjson(
    db.tracks.find(query1).sort(sort1).explain("executionStats")
);

print("\n=== Creating index for Task 1 ===");

db.tracks.createIndex({
    track_genre: 1,
    "audio_features.danceability": 1,
    popularity: -1
});

print("\n=== Завдання 1. Explain AFTER index ===");

printjson(
    db.tracks.find(query1).sort(sort1).explain("executionStats")
); 


print("\n=== Завдання 2. Explain for work music query ===");

const query2 = {
    "audio_features.instrumentalness": { $gt: 0.5 },
    "audio_features.speechiness": { $lt: 0.1 },
    explicit: false
};

print("\n=== Creating index for Task 2 ===");

db.tracks.createIndex({
    "audio_features.instrumentalness": 1,
    "audio_features.speechiness": 1,
    explicit: 1
});

print("\n=== Завдання 2. Explain AFTER index ===");

printjson(
    db.tracks.find(query2).explain("executionStats")
); 