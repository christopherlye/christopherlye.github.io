// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const express = require("express");
const usersRouter = express.Router();

// ---------------------------------------------------------------- //
//                          Models
// ---------------------------------------------------------------- //

const Users = require("../models/users.js");

// ---------------------------------------------------------------- //
//                          Get Routes
// ---------------------------------------------------------------- //

// New
usersRouter.get("/new", (req, res) => {
  res.render("../views/users/new.ejs");
});

// ---------------------------------------------------------------- //
//                  Action Routes (post, put, delete)
// ---------------------------------------------------------------- //

// Create
usersRouter.post("/", (req, res) => {
  Users.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    } else {
      console.log(createdUser);
      res.redirect("/");
    }
  });
});

module.exports = usersRouter;
