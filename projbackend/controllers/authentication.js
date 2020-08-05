const User = require("../models/user");
const { check, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var ejwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      _id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email does not exist.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Password does not match.",
      });
    }
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // put token cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send respond to frontend
    const { _id, fname, lname, email, role } = user;
    return res.json({ token, user: { _id, fname, lname, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user sign out successfully",
  });
};

// protected routes
exports.isSignedIn = ejwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!checker) {
    return res.status(403).json({ error: "ACCESS DENIED!" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "You are not an ADMIN!" });
  }
  next();
};
