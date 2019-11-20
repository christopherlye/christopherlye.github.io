// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const mongoose = require("mongoose"); //require mongoose
const Schema = mongoose.Schema; // create shorthand for mongoose Schema constructor

// ---------------------------------------------------------------- //
//                          Schema
// ---------------------------------------------------------------- //

const remindersSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    active: { type: Boolean },
    attendeeGroup: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

// ---------------------------------------------------------------- //
//                          Exports
// ---------------------------------------------------------------- //

module.exports = mongoose.model("Reminders", remindersSchema);
