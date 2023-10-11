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

//db.run(`
//INSERT INTO previousCats (previousCatID, name, adoptedDate, color, breed, location)
//VALUES (1, "Hedda", 20230926, "white", "Ragdoll", "Malmö");
//`);

// db.run(`
// INSERT INTO previousCats (previousCatID, name, adoptedDate, color, breed, location)
// VALUES (2, "Hasse", 20230926, "white", "Ragdoll", "Malmö");
// `);

// db.run(`
// INSERT INTO previousCats (previousCatID, name, adoptedDate, color, breed, location)
// VALUES (3, "Husse", 20230926, "white", "Ragdoll", "Malmö");
// `);

// db.run(`
// INSERT INTO previousCats (previousCatID, name, adoptedDate, color, breed, location)
// VALUES (4, "Bo", 20230926, "white", "Ragdoll", "Malmö");
// `);

exports.getAllPreviousCats = function (callback) {
  const query = `SELECT * FROM previousCats`;

  db.all(query, function (error, allPreviousCats) {
    callback(error, allPreviousCats);
  });
};

exports.getSpecificCat = function (id, callback) {
  const query = `SELECT * FROM previousCats WHERE previousCatID = ?`;
  const values = [id];

  db.get(query, values, function (error, previousCat) {
    callback(error, previousCat);
  });
};
