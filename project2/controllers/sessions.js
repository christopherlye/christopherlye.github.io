// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const express = require("express");
const sessionsRouter = express.Router();

// ---------------------------------------------------------------- //
//                          Models
// ---------------------------------------------------------------- //

const Users = require("../models/users.js");

// ---------------------------------------------------------------- //
//                          Get Routes
// ---------------------------------------------------------------- //

// New
sessionsRouter.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// ---------------------------------------------------------------- //
//                          Action Routes
// ---------------------------------------------------------------- //

// Create
sessionsRouter.post("/", (req, res) => {
  Users.findOne({ username: req.body.username }, (err, foundUser) => {
    // if db error handle the db error
    if (err) {
      console.log(err);
      res.send("oops something went wrong");
      // if user not found, handle the error
    } else if (!foundUser) {
      res.send("user not found!");
    } else {
      if (req.body.password == foundUser.password) {
        req.session.currentUser = foundUser;
        res.redirect("/");
        // if passwords don't match, handle the error
      } else {
        res.send('<a href="/">wrong password</a>');
      }
    }
  });
});

// Delete
sessionsRouter.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessionsRouter;
