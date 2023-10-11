const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("FOSTERCATS.db");

db.run(`
    CREATE TABLE IF NOT EXISTS arrivingCats (
        arrivingCatID INTEGER PRIMARY KEY,
        name TEXT, 
        estimatedArrival DATE,
        birth DATE,
        description TEXT,
        color TEXT,
        breed TEXT,
        origin TEXT
        
    )
`);

db.run(`
INSERT INTO availableCats (availableCatID, name, publishDate, birth, description, color, breed, location)
 VALUES (1, "Hassan", 20231201, 20210508, "A shy boy found in a shed", "Red", "No Breed", "Huskvarna");
`);

db;

exports.getAllArrivingCats = function (callback) {
  const query = `SELECT * FROM arrivingCats`;

  db.all(query, function (error, allArrivingCats) {
    callback(error, allArrivingCats);
  });
};
