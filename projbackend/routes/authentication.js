var express = require("express");
var router = express.Router();

const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/authentication");
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("fname")
      .isLength({ min: 2 })
      .withMessage("Fist name should be at least 2 characters."),
    check("lname")
      .isLength({ min: 2 })
      .withMessage("Last name should be at least 2 characters."),
    check("email").isEmail().withMessage("Enter a valid email address."),
    check("password")
      .isLength({ min: 6, max: 50 })
      .withMessage("Password should be between 6-50 characters."),
    /* check("password")
      .isLowercase({ min: 1 })
      .withMessage("Password should contain at least 1 lowercase character."),
    check("password")
      .isUppercase({ min: 1 })
      .withMessage("Password should contain at least 1 uppercase character."),
    check("password")
      .isNumeric({ min: 1 })
      .withMessage("Password should contain at least 1 number."),
    check("password")
      .isAscii({ min: 1 })
      .withMessage("Password should contain at least 1 character."), */
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Enter a valid email address."),
    check("password")
      .isLength({ min: 6, max: 50 })
      .withMessage("Password is required"),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
