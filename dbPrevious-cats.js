const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("FOSTERCATS.db");

db.run(`
    CREATE TABLE IF NOT EXISTS previousCats (
        previousCatID INTEGER PRIMARY KEY,
        name TEXT, 
        adoptedDate DATE,
        color TEXT,
        breed TEXT,
        location TEXT
        
    )
`);

db.run(`
 INSERT INTO availableCats (availableCatID, name, publishDate, birth, description, color, breed, location)
 VALUES (1, "Hedda", 20230926, 20170913, "white", "Ragdoll", "Malmö");
`);

db;

exports.getAllPreviousCats = function (callback) {
  const query = `SELECT * FROM previousCats`;

  db.all(query, function (error, allPreviousCats) {
    callback(error, allPreviousCats);
  });
};
