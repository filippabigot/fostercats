const express = require("express");
const expressHandlebars = require("express-handlebars");
//const expressSession = require("express-session");
//const SQLiteStore = require("connect-sqlite3")(expressSession);
const path = require("node:path");
const dbAvailableCats = require("./dbAvailable-cats.js");

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

app.get("/contact", function (request, response) {
  response.render("contact.hbs");
});

app.get("/foster-care", function (request, response) {
  response.render("foster-care.hbs");
});

app.get("/sponsors", function (request, response) {
  response.render("sponsors.hbs");
});

app.get("/arriving-cats", function (request, response) {
  response.render("arriving-cats.hbs");
});

app.get("/previous-cats", function (request, response) {
  response.render("previous-cats.hbs");
});

app.listen(8080);
