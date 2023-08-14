const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true , unique:true},
  emailid: { type: String, required: true },
  phoneno: { type: Number, required: true },
  password: { type: String, required: true },
});

module.exports = schema;
