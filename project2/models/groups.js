// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const mongoose = require("mongoose"); //require mongoose
const Schema = mongoose.Schema; // create shorthand for mongoose Schema constructor

// ---------------------------------------------------------------- //
//                          Schema
// ---------------------------------------------------------------- //

const groupsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }
    // attendees: [{ type: Schema.Types.ObjectId, ref: "Attendees" }] // remember to put comma above
  },
  { timestamps: true }
);

// ---------------------------------------------------------------- //
//                          Exports
// ---------------------------------------------------------------- //

module.exports = mongoose.model("Groups", groupsSchema);
