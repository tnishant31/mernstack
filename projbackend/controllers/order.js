const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "fname price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: "No order found." });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;

  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({ error: "Saving the order failed." });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id fname")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: "Orders not found" });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({ error: "Order status update failed" });
      }
      res.json(order);
    }
  );
};
