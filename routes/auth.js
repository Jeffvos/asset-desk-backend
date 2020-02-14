const router = require("express").Router();
const User = require("../models/user.model");
const verify = require("../verify-token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registrationValidation, loginValidation } = require("../validation");

router.route("/login").post(async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Email or password wrong");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Email or password wrong");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send("200");
});

router.route("/in").get(verify, (req, res) => {
  res.json({ helllo: "hello" });
});

router.route("/register").post(async (req, res) => {
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  newUser
    .save()
    .then(() => res.json("user added"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/users").get(verify, (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
