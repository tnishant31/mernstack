const express = require("express");
const router = express.Router();

const { payUsingStripe } = require("../controllers/stripepayment");

router.post("/stripepayment", payUsingStripe);

module.exports = router;
