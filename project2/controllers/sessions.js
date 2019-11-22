// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const express = require("express");
const sessionsRouter = express.Router();
const bcrypt = require("bcrypt");

// ---------------------------------------------------------------- //
//                          Models
// ---------------------------------------------------------------- //

const Users = require("../models/users.js");

// ---------------------------------------------------------------- //
//                          Get Routes
// ---------------------------------------------------------------- //

// New
sessionsRouter.get("/new", (req, res) => {
  if (req.session.currentUser) {
    res.redirect("/wedding/attendees");
  } else {
    res.render("sessions/new.ejs", {
      currentUser: req.session.currentUser
    });
  }
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
      // compareSync function will return true or false and will be determining if the passwords match.
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/wedding/attendees");
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
