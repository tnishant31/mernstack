const Product = require("../models/product");
const { check, validationResult } = require("express-validator");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ error: "Product not found." });
      }
      req.product = product;
      next();
    });
};

// create
exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "Unable to load the image." });
    }

    // // validating fields
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(422).json({
    //     errors: errors.array()[0].msg,
    //   });
    // }

    // destructure the fields
    const {
      title,
      author,
      description,
      publisher,
      price,
      category,
      stock,
    } = fields; // means same as fields.title

    // adding restrictions
    if (
      !title ||
      !author ||
      !description ||
      !publisher ||
      !price ||
      !category ||
      !stock
    ) {
      return res.status(400).json({
        error: "One or more fields are missing. All fields are required.",
      });
    }

    let product = new Product(fields);

    // handling files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "Image size is too large. It should not exceed 3MB.",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // console.log(product);

    // save to DB
    product.save((err, item) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: "Saving the product to DB failed." });
      }
      res.json(item);
    });
  });
};

// read
exports.getProduct = (req, res) => {
  req.product.photo = undefined; // for images
  // console.log(`The photo is ${pic}`);
  return res.json(req.product.photo);
};

// miidleware for images
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    // console.log(typeof req.product.photo.data);
    res.set("Content-Type", req.product.photo.contentType);
    // console.log(req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// update
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "Unable to load the image." });
    }

    // updation code
    let product = req.product;
    product = _.extend(product, fields);

    // handling files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "Image size is too large. It should not exceed 3MB.",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    console.log(product);

    // save to DB
    product.save((err, item) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: "Updation of the product to DB failed." });
      }
      res.json(item);
    });
  });
};

// delete
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: "Unable to delete the product" });
    }
    res.json({ message: "Product deleted successfully", deletedProduct });
  });
};

// product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  let sortBy = req.query.sortBy ? req.query.sort : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: "Unable to fetch the products" });
      }
      res.json(products);
    });
};

// getting product by category
exports.getProductByCategory = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({ error: "No category found." });
    }
    res.json(category);
  });
};

// middleware for stocks
exports.updateInventory = (req, res, next) => {
  let myOperations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $increment: { stock: -product.count, sold: +product.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, items) => {
    if (err) {
      return res.status(400).json({ error: "Bulk operation failed" });
    }

    next();
  });
};
