const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
      trim: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    enc_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
      trim: true,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.enc_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.enc_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
