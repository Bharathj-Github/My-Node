const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
//{ path: path.join(__dirname, "../config/.env") }
const bcrypt = require("bcrypt");
const model = require("../config/db/model");

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await model.find({ username });
  if (user[0]) {
    const isValid = bcrypt.compareSync(password, user[0].password);
    if (isValid) {
      res.json({ status: "pass", message: "Authorized" });
    } else {
      res.json({ status: "fail", message: "Incorrect Password !!" });
    }
  } else {
    const err = new Error("Username Is Invalid !!");
    err.status = 400;
    next(err);
  }
};

exports.register = async (req, res, next) => {
  const user = await model.find({ username: req.body.username });
  if (user[0]) {
    const err = new Error("Username Already Exists !!");
    err.status = 400;
    next(err);
  } else {
    await model({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      emailid: req.body.emailid,
      phoneno: req.body.phoneno,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .save()
      .then(() => {
        res.json({ status: "pass", message: "Registered Successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
