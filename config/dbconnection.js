const path = require('path');
require("dotenv").config({path: path.join(__dirname,".env")});
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING+"user_registration")
  .then(() => {
    console.log("SUCCESSFULLY CONNECTED TO DATA BASE...");
  })
  .catch((err) => {
    console.log("ERROR: " + err + __dirname);
  });
