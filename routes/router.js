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
router.get("/api/registeredusers", async (req, res) => {
  try{
    let users = await model.find({"username": req.query.username});
    res.json({ data: users });
  }
  catch(e){
    console.log("ERROR :"+e)
  }
});

module.exports = router;
