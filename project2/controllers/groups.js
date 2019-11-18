// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const express = require("express");
const groupsRouter = express.Router();

// ---------------------------------------------------------------- //
//                          Models
// ---------------------------------------------------------------- //

const Groups = require("../models/groups.js");

// ---------------------------------------------------------------- //
//                          Get Routes
// ---------------------------------------------------------------- //

// Index
groupsRouter.get("/", (req, res) => {
  Groups.find({}, (err, allGroups) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("../views/groups/index.ejs", {
        groups: allGroups
      });
    }
  });
});

// New
groupsRouter.get("/new", (req, res) => {
  res.render("../views/groups/new.ejs");
});

// Seed
groupsRouter.get("/seed", (req, res) => {
  res.send("add group seed data");
});

// Delete
groupsRouter.get("/deleteAll", (req, res) => {
  res.send("to delete all group data");
});

// Show
groupsRouter.get("/:id", (req, res) => {
  Groups.find({ _id: req.params.id }, (err, group) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("../views/groups/show.ejs", {
        group: group[0]
      });
      // res.send("working");
    }
  });
});
// ---------------------------------------------------------------- //
//                  Action Routes (post, put, delete)
// ---------------------------------------------------------------- //

// Create
groupsRouter.post("/new", (req, res) => {
  Groups.create(req.body, (err, allGroups) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(allGroups);
      res.redirect("/wedding/groups");
    }
  });
});

module.exports = groupsRouter;
