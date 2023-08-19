const path = require("path");
require("dotenv").config();
//{ path: path.join(__dirname, "../config/.env") }
const express = require("express");
const router = express.Router();
const controllers = require('./controllers');
const jwt = require("jsonwebtoken");

router.post("/register", controllers.register);
router.get("/api/registeredusers", controllers.registeredusers);
router.get("/login",controllers.login);
router.get("/home",authenticateToken, controllers.home);

function authenticateToken(req, res, next) {
  const header = req.headers["Authorization"];
  const token = header.split(' ')[1]
  console.log(token)
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = router;
