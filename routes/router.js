const express = require("express");
const router = express.Router();
const model = require("../config/db/model");
const bcrypt = require("bcrypt");

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
router.get("/register", (req, res) => {
  res.json({ status: "success" });
});

module.exports = router;
