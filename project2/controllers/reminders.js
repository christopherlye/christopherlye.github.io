// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const express = require("express");
const remindersRouter = express.Router();

// ---------------------------------------------------------------- //
//                          Models
// ---------------------------------------------------------------- //

const Reminders = require("../models/reminders.js");

// ---------------------------------------------------------------- //
//                          Get Routes
// ---------------------------------------------------------------- //

// Index
remindersRouter.get("/", (req, res) => {
  res.render("../views/reminders/index.ejs");
});

// New
remindersRouter.get("/new", (req, res) => {
  res.render("../views/reminders/new.ejs");
});

// Edit
remindersRouter.get("/edit/:id", (req, res) => {
  res.render("../views/reminders/edit.ejs");
});

// Show
remindersRouter.get("/:id", (req, res) => {
  res.render("../views/reminders/show.ejs");
});

// ---------------------------------------------------------------- //
//                  Action Routes (post, put delete)
// ---------------------------------------------------------------- //

// Create
// remindersRouter.post('/',)

module.exports = remindersRouter;
