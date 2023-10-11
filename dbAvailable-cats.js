const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("FOSTERCATS.db");

db.run(`
    CREATE TABLE IF NOT EXISTS availableCats (
        availableCatID INTEGER PRIMARY KEY,
        name TEXT, 
        publishDate DATE,
        birth DATE,
        description TEXT,
        color TEXT,
        breed TEXT,
        location TEXT
        
    )
`);

// db.run(`
// INSERT INTO availableCats (availableCatID, name, publishDate, birth, description, color, breed, location)
// VALUES (1, "Morris", 20231011, 20230809, "A cute kitten who likes to play", "grey", "No Breed", "Jönköping");
//`);

db;

exports.getAllAvailableCats = function (callback) {
  const query = `SELECT * FROM availableCats`;

  db.all(query, function (error, allAvailableCats) {
    callback(error, allAvailableCats);
  });
};
