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

//db.run(`
//INSERT INTO arrivingCats (arrivingCatID, name, estimatedArrival, birth, description, color, breed, origin)
// VALUES (1, "Hassan", 20231201, 20210508, "A shy boy found in a shed", "Red", "No Breed", "Huskvarna");
//`);

// db.run(`
// INSERT INTO arrivingCats (arrivingCatID, name, estimatedArrival, birth, description, color, breed, origin)
// VALUES (2, "Lisa", 20231201, 20210508, "A shy boy found in a shed", "Red", "No Breed", "Huskvarna");
// `);

// db.run(`
// INSERT INTO arrivingCats (arrivingCatID, name, estimatedArrival, birth, description, color, breed, origin)
// VALUES (3, "Mimmi", 20231201, 20210508, "A shy boy found in a shed", "Red", "No Breed", "Huskvarna");
// `);

// db.run(`
// INSERT INTO arrivingCats (arrivingCatID, name, estimatedArrival, birth, description, color, breed, origin)
// VALUES (4, "Lollo", 20231201, 20210508, "A shy boy found in a shed", "Red", "No Breed", "Huskvarna");
// `);

exports.getAllArrivingCats = function (callback) {
  const query = `SELECT * FROM arrivingCats`;

  db.all(query, function (error, allArrivingCats) {
    callback(error, allArrivingCats);
  });
};

exports.getSpecificCat = function (id, callback) {
  const query = `SELECT * FROM arrivingCats WHERE arrivingCatID = ?`;
  const values = [id];

  db.get(query, values, function (error, arrivingCat) {
    callback(error, arrivingCat);
  });
};
