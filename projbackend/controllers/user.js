const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.enc_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },

    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "You are not authorized to update this profile.",
        });
      }
      user.salt = undefined;
      user.enc_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(req.user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id fname")
    .exec((err, order) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "You have not ordered anything yet.." });
      }
      return res.json({ order });
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((item) => {
    purchases.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity,
      amount: req.body.order.amount,
      transactionId: req.body.order.transactionId,
    });
  });

  // storing this is DB
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchase) => {
      if (err) {
        return res.status(400).json({ error: "Unable to store the Item" });
      }
      next();
    }
  );
};
