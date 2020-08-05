const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    author: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    publisher: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
