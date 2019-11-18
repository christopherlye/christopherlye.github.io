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

// Edit
groupsRouter.get("/edit/:id", (req, res) => {
  Groups.find({ _id: req.params.id }, (err, group) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("../views/groups/edit.ejs", {
        group: group[0]
      });
    }
  });
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

// Update
groupsRouter.put("/edit/:id", (req, res) => {
  Groups.find({ _id: req.params.id }, (err, group) => {
    if (err) {
      console.log(err.message);
      res.redirect("/wedding/groups/");
    } else {
      Groups.updateOne({ _id: req.params.id }, req.body, (error, group) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log(group);
          res.redirect("/wedding/groups/" + req.params.id);
        }
      });
    }
  });
});

// Delete
groupsRouter.delete("/:id", (req, res) => {
  Groups.find({}, (err, group) => {
    if (err) {
      console.log(err.message);
    } else {
      Groups.deleteOne({ _id: req.params.id }, (error, data) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log(data);
          res.redirect("/wedding/groups");
        }
      });
    }
  });
});

module.exports = groupsRouter;
