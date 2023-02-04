const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
    },

    brand_name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: [String],
    price: {
      // valid number decimal
      type: Number,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      trim: true,
      default: 0,
    },
    

    deletedAt: {
      // when the document is deleted
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    addToWishList:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
