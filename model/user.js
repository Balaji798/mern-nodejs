const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      // valid
      type: String,
      required: true,
      trim: true,
    },

    password: {
      // minlen 8, maxlen 15 // encrypted password
      type: String,
      required: true,
      trim: true
     
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("e-User", userSchema);
