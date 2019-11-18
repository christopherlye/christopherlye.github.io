// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const express = require("express");
const attendeesRouter = express.Router();
// const date = require("dateformat");

// ---------------------------------------------------------------- //
//                          Models
// ---------------------------------------------------------------- //

const Attendees = require("../models/attendees.js");
const AttendeeSeed = require("../models/seed.js");

// ---------------------------------------------------------------- //
//                              Get Routes
// ---------------------------------------------------------------- //

// Index
attendeesRouter.get("/", (req, res) => {
  Attendees.find({}, (err, allAttendees) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("./attendees/index.ejs", {
        attendees: allAttendees
      });
    }
  });
});

// New
attendeesRouter.get("/new", (req, res) => {
  res.render("./attendees/new.ejs");
});

// Delete All
attendeesRouter.get("/deleteAll", (req, res) => {
  Attendees.collection.drop();
  res.redirect("/wedding/attendees");
});

// Seed
// Create seed data - add once only
attendeesRouter.get("/seed", (req, res) => {
  Attendees.create(AttendeeSeed, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("added attendee seed data");
    }
  });
  res.redirect("/wedding/attendees");
});

// Edit
attendeesRouter.get("/edit/:id", (req, res) => {
  Attendees.find({ _id: req.params.id }, (err, attendee) => {
    if (err) {
      console.log(err.message);
      res.redirect("/" + req.params.id);
    } else {
      res.render("./attendees/edit.ejs", {
        attendee: attendee[0]
      });
    }
  });
});

// Show
attendeesRouter.get("/:id", (req, res) => {
  Attendees.find({ _id: req.params.id }, (err, attendee) => {
    if (err) {
      console.log(err.message);
      res.redirect("/" + req.params.id);
    } else {
      res.render("./attendees/show.ejs", {
        attendee: attendee[0]
      });
    }
  });
});

// ---------------------------------------------------------------- //
//                  Action Routes (post, put, delete)
// ---------------------------------------------------------------- //

// Create
attendeesRouter.post("/new", (req, res) => {
  if (req.body.attendance === "on") {
    req.body.attendance = true;
  } else {
    req.body.attendance = false;
  }
  Attendees.create(req.body, (err, data) => {
    console.log(req.body);
    res.redirect("/wedding/attendees/");
  });
});

// Update
attendeesRouter.put("/edit/:id", (req, res) => {
  if (req.body.attendance === "on") {
    req.body.attendance = true;
  } else {
    req.body.attendance = false;
  }
  Attendees.find({ _id: req.params.id }, (err, attendee) => {
    if (err) {
      console.log(err.message);
      res.redirect("/wedding/attendees/");
    } else {
      Attendees.updateOne(
        { _id: req.params.id },
        req.body,
        (error, attendee) => {
          if (error) {
            console.log(error.message);
          } else {
            console.log(attendee);
            res.redirect("/wedding/attendees/" + req.params.id);
          }
        }
      );
    }
  });
});

// Delete
attendeesRouter.delete("/:id", (req, res) => {
  Attendees.find({}, (err, attendee) => {
    if (err) {
      console.log(err.message);
    } else {
      Attendees.deleteOne({ _id: req.params.id }, (error, data) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log(data);
          res.redirect("/wedding/attendees");
        }
      });
    }
  });
});

module.exports = attendeesRouter;
