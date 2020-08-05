const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateInventory } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// actual routes

// create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateInventory,
  createOrder
);

// read
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// status
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

// delete

module.exports = router;