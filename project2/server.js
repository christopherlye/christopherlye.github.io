// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3300;

const methodOverride = require("method-override");
const mongoose = require("mongoose");

// ---------------------------------------------------------------- //
//                           Middleware
// ---------------------------------------------------------------- //
// Static
app.use("/", express.static("public"));

// Body parser
app.use(express.urlencoded({ extended: false }));

// Method Override
app.use(methodOverride("_method"));

// ---------------------------------------------------------------- //
//                          Controllers
// ---------------------------------------------------------------- //

// to scale up to be able to do something like /:eventName/attendees
const attendeesController = require("./controllers/attendees.js");
app.use("/wedding/attendees", attendeesController);
const groupsController = require("./controllers/groups.js");
app.use("/wedding/groups", groupsController);

// ---------------------------------------------------------------- //
//                          Models
// ---------------------------------------------------------------- //
const AttendeeGroups = require("./models/groups.js");

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
//                              Get Routes
// ---------------------------------------------------------------- //
app.get("/", (req, res) => {
  res.send("This is working");
});

// ---------------------------------------------------------------- //
//                              Listener
// ---------------------------------------------------------------- //
app.listen(PORT, () => {
  console.log(`Server running on port `, PORT);
});
