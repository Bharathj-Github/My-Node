const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
//{ path: path.join(__dirname, "../config/.env") }
const express = require("express");
const router = express.Router();
const controllers = require('./controllers');

router.post("/register", controllers.register);
router.post("/login", controllers.login);

module.exports = router;
