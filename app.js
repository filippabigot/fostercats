const express = require("express");
const expressHandlebars = require("express-handlebars");
//const expressSession = require("express-session");
//const SQLiteStore = require("connect-sqlite3")(expressSession);
const path = require("node:path");
const dbAvailableCats = require("./dbAvailable-cats.js");
const dbPreviousCats = require("./dbPrevious-cats.js");
const dbArrivingCats = require("./dbArriving-cats.js");

const app = express();

app.engine(
  "hbs",
  expressHandlebars.engine({
    defaultLayout: "main.hbs",
  })
);

app.get("/", function (request, response) {
  response.render("start.hbs");
});

app.get("/add-cat", function (request, response) {
  response.render("add-cat.hbs");
});

app.get("/about", function (request, response) {
  response.render("about.hbs");
});

app.get("/contact", function (request, response) {
  response.render("contact.hbs");
});

app.get("/foster-care", function (request, response) {
  response.render("foster-care.hbs");
});

app.get("/sponsors", function (request, response) {
  response.render("sponsors.hbs");
});

//---------------- ARRIVING CATS ---------------------------
app.get("/arriving-cats", function (request, response) {
  dbArrivingCats.getAllArrivingCats(function (error, allArrivingCats) {
    if (error) {
      console.log(error);
      const model = {
        dbError: true,
      };
      response.render("arriving-cats.hbs", model);
    } else {
      const model = {
        dbError: false,
        allArrivingCats,
      };
      response.render("arriving-cats.hbs", model);
    }
  });
});

app.get("/arriving-cat/:id", function (request, response) {
  const id = request.params.id;
  dbArrivingCats.getSpecificCat(id, function (error, arrivingCat) {
    if (error) {
      console.log(error);
      const model = {
        dbError: true,
      };
      response.render("arriving-cat.hbs", model);
    } else {
      const model = {
        dbError: false,
        arrivingCat,
      };
      response.render("arriving-cat.hbs", model);
    }
  });
});

//---------------- PREVIOUS CATS ---------------------------
app.get("/previous-cats", function (request, response) {
  dbPreviousCats.getAllPreviousCats(function (error, allPreviousCats) {
    if (error) {
      console.log(error);
      const model = {
        dbError: true,
      };
      response.render("previous-cats.hbs", model);
    } else {
      const model = {
        dbError: false,
        allPreviousCats,
      };
      response.render("previous-cats.hbs", model);
    }
  });
});

app.get("/previous-cat/:id", function (request, response) {
  const id = request.params.id;
  dbPreviousCats.getSpecificCat(id, function (error, previousCat) {
    if (error) {
      console.log(error);
      const model = {
        dbError: true,
      };
      response.render("previous-cat.hbs", model);
    } else {
      const model = {
        dbError: false,
        previousCat,
      };
      response.render("previous-cat.hbs", model);
    }
  });
});

//---------------- AVAILABLE CATS ---------------------------
app.get("/available-cats", function (request, response) {
  dbAvailableCats.getAllAvailableCats(function (error, allAvailableCats) {
    if (error) {
      console.log(error);
      const model = {
        dbError: true,
      };
      response.render("available-cats.hbs", model);
    } else {
      const model = {
        dbError: false,
        allAvailableCats,
      };
      response.render("available-cats.hbs", model);
    }
  });
});

app.get("/available-cat/:id", function (request, response) {
  const id = request.params.id;
  dbAvailableCats.getSpecificCat(id, function (error, availableCat) {
    if (error) {
      console.log(error);
      const model = {
        dbError: true,
      };
      response.render("available-cat.hbs", model);
    } else {
      const model = {
        dbError: false,
        availableCat,
      };
      response.render("available-cat.hbs", model);
    }
  });
});

app.listen(8080);
