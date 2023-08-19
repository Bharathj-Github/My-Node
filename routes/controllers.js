const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../config/db/model");

exports.login = (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  console.log(accessToken);
  res.setHeader("Authorization", accessToken);
  res.send({ accessToken });
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
exports.registeredusers = async (req, res) => {
  try {
    let users = await model.find({ username: req.query.username });
    res.json({ data: users });
  } catch (e) {
    console.log("ERROR :" + e);
  }
};
exports.home = (req, res) => {
    res.json({ status: "success" });
  }