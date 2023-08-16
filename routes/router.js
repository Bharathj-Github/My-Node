const path = require("path");
require("dotenv").config();
//{ path: path.join(__dirname, "../config/.env") }
const express = require("express");
const router = express.Router();
const model = require("../config/db/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const user = new model({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    emailid: req.body.emailid,
    phoneno: req.body.phoneno,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user
    .save()
    .then(() => {
      console.log("done");
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({ status: "successfully data added..." });
});
router.get("/api/registeredusers", async (req, res) => {
  try {
    let users = await model.find({ username: req.query.username });
    res.json({ data: users });
  } catch (e) {
    console.log("ERROR :" + e);
  }
});

router.get("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.send({ accessToken: accessToken });
});
router.get("/home", authenticateToken, (req, res) => {
  res.json({ status: "success" });
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = router;
