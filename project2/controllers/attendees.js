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
const AttendeeSeed = require("../seed/seed.js");
const Groups = require("../models/groups.js");

// ---------------------------------------------------------------- //
//                              Get Routes
// ---------------------------------------------------------------- //

// Index
attendeesRouter.get("/", (req, res) => {
  // if user is logged in
  if (req.session.currentUser) {
    Attendees.find({}, (err, allAttendees) => {
      if (err) {
        console.log(err.message);
      } else {
        Groups.find({}, (error, allGroups) => {
          if (error) {
            console.log(error.message);
          } else {
            res.render("./attendees/index.ejs", {
              attendees: allAttendees,
              groups: allGroups,
              currentUser: req.session.currentUser
            });
          }
        });
      }
    });
  } else {
    res.redirect("/sessions/new");
  }
});

// New
attendeesRouter.get("/new", (req, res) => {
  if (req.session.currentUser) {
    Groups.find({}, (err, allGroups) => {
      if (err) {
        console.log(err.message);
      } else {
        res.render("./attendees/new.ejs", {
          groups: allGroups
        });
      }
    });
  } else {
    res.redirect("/sessions/new");
  }
});

// RSVP
attendeesRouter.get("/rsvp", (req, res) => {
  Attendees.find({}, (err, allAttendees) => {
    if (err) {
      console.log(err.message);
    } else {
      Groups.find({}, (error, allGroups) => {
        if (error) {
          console.log(error.message);
        } else {
          res.render("./rsvp/rsvp.ejs", {
            attendees: allAttendees,
            groups: allGroups
          });
        }
      });
    }
  });
});

// Thank you
attendeesRouter.get("/thankyou", (req, res) => {
  Attendees.find({}, (err, allAttendees) => {
    if (err) {
      console.log(err.message);
    } else {
      Groups.find({}, (error, allGroups) => {
        if (error) {
          console.log(error.message);
        } else {
          res.render("./rsvp/thankyou.ejs", {
            attendees: allAttendees,
            groups: allGroups
          });
        }
      });
    }
  });
});

// Delete All
attendeesRouter.get("/deleteAll", (req, res) => {
  if (req.session.currentUser) {
    Attendees.collection.drop();
    res.redirect("/wedding/attendees");
  } else {
    res.redirect("/sessions/new");
  }
});

// Seed
// Create seed data - add once only
attendeesRouter.get("/seed", (req, res) => {
  if (req.session.currentUser) {
    Attendees.create(AttendeeSeed, (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("added attendee seed data");
      }
    });
    res.redirect("/wedding/attendees");
  } else {
    res.redirect("/sessions/new");
  }
});

// Edit
attendeesRouter.get("/edit/:id", (req, res) => {
  if (req.session.currentUser) {
    Attendees.find({ _id: req.params.id }, (err, attendee) => {
      if (err) {
        console.log(err.message);
        res.redirect("/" + req.params.id);
      } else {
        Groups.find({}, (err, allGroups) => {
          if (err) {
            console.log(err.message);
          } else {
            res.render("./attendees/edit.ejs", {
              attendee: attendee[0],
              groups: allGroups
            });
          }
        });
      }
    });
  } else {
    res.redirect("/sessions/new");
  }
});

// Show
attendeesRouter.get("/:id", (req, res) => {
  if (req.session.currentUser) {
    Attendees.find({ _id: req.params.id }, (err, attendee) => {
      if (err) {
        console.log(err.message);
        res.redirect("/" + req.params.id);
      } else {
        Groups.find({ _id: attendee[0].group }, (error, group) => {
          if (error) {
            console.log(error.message);
          } else {
            if (group[0] === undefined) {
              res.render("./attendees/show.ejs", {
                attendee: attendee[0],
                group: { name: "Assign a new group" }
              });
            } else {
              res.render("./attendees/show.ejs", {
                attendee: attendee[0],
                group: group[0]
              });
            }
          }
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

// Create - RSVP
attendeesRouter.post("/rsvp/new", (req, res) => {
  if (req.body.attendance === "on") {
    req.body.attendance = true;
  } else {
    req.body.attendance = false;
  }

  Attendees.create(req.body, (err, data) => {
    console.log(req.body);
    res.redirect("/wedding/attendees/thankyou/");
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
