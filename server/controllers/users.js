const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

// Todo

/**
 * Store tokens in cookies and sign/secure it
 */

// Signup User

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      res.json(users);
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id, { password: 0 });
      res.json(user);
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!users) return res.json({ msg: "No user found" });
      res.json(users);
    } catch (error) {
      res.json(error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const users = await User.findOne({ _id: req.params.id });
      if (!users) return res.json({ msg: "No user found" });
      users.remove();
      res.json(users._id);
    } catch (error) {
      res.json(error.message);
    }
  },
  signup: async (req, res) => {
    const { email, password } = req.body;
    //   return res.json(req.body);
    if (!email || !password)
      return res.json({ msg: "Provide an email and/or password" });
    let user = await User.findOne({ email: email });
    if (user) return res.json({ msg: "User with same email already exist" });

    try {
      user = await User.create({
        ...req.body,
        password: bcrypt.hashSync(password, 10),
      });

      res.json(user._id);
    } catch (error) {
      res.json(error.message);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.send({ msg: "Incorrect email" });
    // return res.json(user)
    let isMatch = bcyrpt.compareSync(password, user.password);
    if (!isMatch) return res.json({ msg: "Incorrect password" });
    try {
      jwt.sign({ user }, config.SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) return res.json({ msg: err });
        res.json(token);
      });
    } catch (error) {
      res.json(error.message);
    }
  },
  me: async (req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.json("Authorization failed");
    try {
      jwt.verify(token, config.SECRET, async (err, data) => {
        if (err) return res.json({ msg: err.message });
        const user = await User.findOne(
          { _id: data.user._id },
          { password: 0 }
        );
        res.json(user);
      });
    } catch (error) {
      res.json(error.message);
    }
  },
};
