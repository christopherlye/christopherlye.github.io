// ---------------------------------------------------------------- //
//                          Dependencies
// ---------------------------------------------------------------- //

const mongoose = require("mongoose"); //require mongoose
const Schema = mongoose.Schema; // create shorthand for mongoose Schema constructor

// ---------------------------------------------------------------- //
//                          Schema
// ---------------------------------------------------------------- //

const usersSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// ---------------------------------------------------------------- //
//                          Exports
// ---------------------------------------------------------------- //

module.exports = mongoose.model("Users", usersSchema);
