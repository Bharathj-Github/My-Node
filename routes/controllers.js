const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
//{ path: path.join(__dirname, "../config/.env") }
const bcrypt = require("bcrypt");
const model = require("../config/db/model");
const cookie = require("cookie");

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username) {
    res.status(206).json({ message: "UserName Must Be Provided !" });
  } else {
    let user = await model.findOne({ username });
    if (!password) {
      res.status(206).json({ message: "Password Must Be Provided !" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const user_id = { userid: user._id };
          const accessToken = jwt.sign(
            user_id,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
          );
          res.cookie("jwt", `${accessToken}`, { expiresIn: "30s" });
          res.status(200).json({ message: "success", accessToken });
        } else {
          res
            .status(206)
            .json({ message: "UserName And Password Doesn't Match !" });
        }
      });
    }
  }
};
exports.register = (req, res) => {
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
};
exports.home = (req, res) => {
  res.json({ status: "success" });
};
