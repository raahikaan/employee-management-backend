const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String,
  subjects: [String],
  attendance: Number,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
