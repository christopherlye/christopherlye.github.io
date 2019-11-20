// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3300;

const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");

// ---------------------------------------------------------------- //
//                          MongoDB Config
// ---------------------------------------------------------------- //

const mongoURI = "mongodb://localhost:27017/wedding";
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Mongo running at", mongoURI);
  }
);

// Error / success - provide error/success messages about the connections
db.on("error", err => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

// ---------------------------------------------------------------- //
//                           Middleware
// ---------------------------------------------------------------- //
// Static
app.use("/", express.static("public"));

// Body parser
app.use(express.urlencoded({ extended: false }));

// Method Override
app.use(methodOverride("_method"));

// Express-session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// ---------------------------------------------------------------- //
//                          Controllers
// ---------------------------------------------------------------- //

// to scale up to be able to do something like /:eventName/attendees
const attendeesController = require("./controllers/attendees.js");
app.use("/wedding/attendees", attendeesController);
const groupsController = require("./controllers/groups.js");
app.use("/wedding/groups", groupsController);
const usersController = require("./controllers/users.js");
app.use("/users", usersController);
const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);
const remindersController = require("./controllers/reminders.js");
app.use("/wedding/reminders", remindersController);

// ---------------------------------------------------------------- //
//                              Get Routes
// ---------------------------------------------------------------- //

// Main route
app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser
  });
});

// ---------------------------------------------------------------- //
//                              Listener
// ---------------------------------------------------------------- //
app.listen(PORT, () => {
  console.log(`Server running on port `, PORT);
});
