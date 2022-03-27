const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Creating User
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    //generating salt
    const salt = await bcrypt.genSalt(10);
    //generating hashedPassword
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating a user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //returning user in response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(400).json("wrong password");
      } else {
        res.status(200).json(user);
      }
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

module.exports = router;
