const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error: "Category not found" });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ error: "Not able to save the Category" });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getCategories = (req, res) => {
  Category.find().exec((err, items) => {
    if (err) {
      return res.status(400).json({ error: "No categories found" });
    }
    res.json(items);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  console.log(category.name);

  category.save((err, updatedCategory) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "Failed to update category." });
    }
    res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({ error: "Failed to delete category." });
    }
    res.json({ message: "Successfully  deleted " + deletedCategory });
  });
};
