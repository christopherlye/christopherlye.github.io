// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const mongoose = require("mongoose"); //require mongoose
const Schema = mongoose.Schema; // create shorthand for mongoose Schema constructor

// ---------------------------------------------------------------- //
//                          Schema
// ---------------------------------------------------------------- //

const attendeeSchema = new Schema(
  {
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    attendance: { type: Boolean },
    group: { type: Schema.Types.ObjectId, ref: "Groups" },
    testgroups: [{ type: String }]
  },
  { timestamps: true }
);

// ---------------------------------------------------------------- //
//                          Exports
// ---------------------------------------------------------------- //

module.exports = mongoose.model("Attendees", attendeeSchema);
