const express = require("express");
const router = express.Router();

const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authentication");

const { getToken, processPayment } = require("../controllers/braintreepayment");

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
