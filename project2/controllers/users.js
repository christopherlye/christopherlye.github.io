// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");

// ---------------------------------------------------------------- //
//                          Models
// ---------------------------------------------------------------- //

const Users = require("../models/users.js");

// ---------------------------------------------------------------- //
//                          Get Routes
// ---------------------------------------------------------------- //

// New
usersRouter.get("/new", (req, res) => {
  res.render("../views/users/new.ejs", {
    currentUser: req.session.currentUser
  });
});

// ---------------------------------------------------------------- //
//                  Action Routes (post, put, delete)
// ---------------------------------------------------------------- //

// Create
usersRouter.post("/", (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  Users.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    } else {
      console.log(createdUser);
      res.redirect("/sessions/new");
    }
  });
});

module.exports = usersRouter;
