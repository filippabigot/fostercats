const express = require("express");
const expressHandlebars = require("express-handlebars");
const dbAvailableCats = require("./dbAvailable-cats.js");
const dbPreviousCats = require("./dbPrevious-cats.js");
const dbArrivingCats = require("./dbArriving-cats.js");
const bodyParser = require("body-parser");
const correctUsername = "filippa";
const correctPassword = "123";
const app = express();

// Require the express-session middleware
const session = require("express-session");

// Configure and set up session management
app.use(
  session({
    secret: "your-secret-key", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.engine(
  "hbs",
  expressHandlebars.engine({
    defaultLayout: "main.hbs",
  })
);

app.use(express.static("public"));

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

//------------------ LOGIN ---------------------------
app.use(function (request, response, next) {
  response.locals.isLoggedIn = false;
  next();
});

app.get("/login", function (request, response) {
  response.render("login.hbs");
});

app.post("/login", function (request, response) {
  console.log("klickade på login");
  const enteredUsername = request.body.username;
  const enteredPassword = request.body.password;

  console.log(enteredUsername);
  console.log(enteredPassword);

  if (
    enteredUsername == correctUsername &&
    enteredPassword == correctPassword
  ) {
    // Successful login
    console.log("kunde logga in");
    request.session.isLoggedIn = true;
    response.redirect("/");
  } else {
    // Login failed
    const errors = [];
    errors.push("Username and Password do not match. Please try again.");

    const model = {
      errors,
      enteredUsername,
      enteredPassword,
    };
    response.render("login.hbs", model);
  }
});

app.post("/logout", function (request, response) {
  isLoggedIn = false;
  response.redirect("/");
  //Lägga till ett popup fönster med "du är nu utloggad"
});

app.listen(8080);
