const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategory,
} = require("../controllers/product");
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");

// cheking validations
router.put("/product/create/:userId", [
  check("title").isEmpty().withMessage("Title cannot be empty"),
  check("author").isEmpty().withMessage("Author cannot."),
  check("description").isEmpty().withMessage("Description cannot be empty."),
  check("publisher")
    .isEmpty()
    .isLength({ max: 100 })
    .withMessage("Publisher cannot be empty."),
  check("price")
    .isCurrency({ require_decimal: true })
    .withMessage("Enter valid price."),
  check("category")
    .isEmpty()
    .withMessage("Categorye should be at least 2 characters."),
  check("stock").isEmpty().withMessage("Stock should be a number."),
]);

// param
router.param("userId", getUserById);
router.param("productId", getProductById);

// actual routes

// create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// listing
router.get("/products", getAllProducts);

router.get("/products/categories", getProductByCategory);

module.exports = router;
