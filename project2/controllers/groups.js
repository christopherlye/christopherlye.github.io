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
  if (req.session.currentUser) {
    Groups.find({}, (err, allGroups) => {
      if (err) {
        console.log(err.message);
      } else {
        res.render("../views/groups/index.ejs", {
          groups: allGroups,
          currentUser: req.session.currentUser
        });
      }
    });
  } else {
    res.redirect("/sessions/new");
  }
});

// New
groupsRouter.get("/new", (req, res) => {
  if (req.session.currentUser) {
    res.render("../views/groups/new.ejs");
  } else {
    res.redirect("/sessions/new");
  }
});

// Edit
groupsRouter.get("/edit/:id", (req, res) => {
  if (req.session.currentUser) {
    Groups.find({ _id: req.params.id }, (err, group) => {
      if (err) {
        console.log(err.message);
      } else {
        res.render("../views/groups/edit.ejs", {
          group: group[0]
        });
      }
    });
  } else {
    res.redirect("/sessions/new");
  }
});

// Show
groupsRouter.get("/:id", (req, res) => {
  if (req.session.currentUser) {
    Groups.find({ _id: req.params.id }, (err, group) => {
      if (err) {
        console.log(err.message);
      } else {
        res.render("../views/groups/show.ejs", {
          group: group[0]
        });
      }
    });
  } else {
    res.redirect("/sessions/new");
  }
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
