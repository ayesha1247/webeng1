const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
},
{ timestamps: true }
);

const Student = mongoose.model("students", studentSchema);
module.exports = Student; 
