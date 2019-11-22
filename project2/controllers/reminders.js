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
  Reminders.find({}, (err, reminders) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("../views/reminders/index.ejs", {
        reminders: reminders,
        currentUser: req.session.currentUser
      });
    }
  });
});

// New
remindersRouter.get("/new", (req, res) => {
  res.render("../views/reminders/new.ejs");
});

// Edit
remindersRouter.get("/edit/:id", (req, res) => {
  Reminders.find({ _id: req.params.id }, (err, reminder) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("../views/reminders/edit.ejs", {
        reminder: reminder[0]
      });
    }
  });
});

// Show
remindersRouter.get("/:id", (req, res) => {
  Reminders.find({ _id: req.params.id }, (err, reminder) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("../views/reminders/show.ejs", {
        reminder: reminder[0]
      });
    }
  });
});

// ---------------------------------------------------------------- //
//                  Action Routes (post, put delete)
// ---------------------------------------------------------------- //

// Create
remindersRouter.post("/new", (req, res) => {
  if (req.body.active === "on") {
    req.body.active = true;
  } else {
    req.body.active = false;
  }
  Reminders.create(req.body, (err, data) => {
    if (err) {
      console.log(err.message);
      console.log(req.body._id);
    } else {
      console.log(data);
      console.log(req.body);
      res.redirect("/wedding/reminders");
    }
  });
});

// Update
remindersRouter.put("/edit/:id", (req, res) => {
  if (req.body.active === "on") {
    req.body.active = true;
  } else {
    req.body.active = false;
  }
  Reminders.find({}, (err, allReminders) => {
    if (err) {
      console.log(err.message);
    } else {
      Reminders.updateOne(
        { _id: req.params.id },
        req.body,
        (error, reminder) => {
          if (error) {
            console.log(error.message);
          } else {
            console.log(reminder);
            reminder: reminder[0];
            res.redirect("/wedding/reminders/" + req.params.id);
          }
        }
      );
    }
  });
});

// Delete
remindersRouter.delete("/:id", (req, res) => {
  Reminders.find({}, (err, allReminders) => {
    if (err) {
      console.log(err.message);
    } else {
      Reminders.deleteOne({ _id: req.params.id }, (error, reminder) => {
        if (error) {
          console.log(error.message);
        } else {
          res.redirect("/wedding/reminders");
        }
      });
    }
  });
});

module.exports = remindersRouter;
