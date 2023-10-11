const express = require("express");
const expressHandlebars = require("express-handlebars");

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
  response.render("available-cats.hbs");
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

app.listen(8080);
