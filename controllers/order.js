const orderModel = require("../model/order");
const mongoose = require("mongoose");
const productModel = require("../model/product");

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

exports.make_order = async (req, res) => {
  try {
    // const cartId = req.body.cartId;
    // const cartData = await cartModel.findOne({ _id: cartId });
    // if (!cartData)
    //   return res.status(400).send({ message: "This cart dose not exist" });
    // const cartCheck = cartData.items.length;
    // if (cartCheck == 0)
    //   return res
    //     .status(404)
    //     .send({ message: "no product exist add product to make order" });
    // const { userId, items, totalPrice, totalItems } = cartData;
    // let totalQuantity = 0;
    // const totalItem = items.length;
    // for (let i = 0; i < totalItem; i++)
    //   totalQuantity = totalQuantity + Number(items[i].quantity);
    // const orderRequest = {
    //   userId,
    //   items,
    //   totalPrice,
    //   totalItems,
    //   totalQuantity,
    // };
    // const orderData = await orderModel.create(orderRequest);
    // return res
    //   .status(201)
    //   .send({ message: "order placed successfully", OrderDetail: orderData });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.cancel_order = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const Order = await orderModel.findOne({ _id: orderId, isDeleted: false });
    if (!Order) {
      return res
        .status(400)
        .send({ status: false, message: "order id not correct " });
    }
    const cancelledOrder = await orderModel.findOneAndUpdate(
      { _id: orderId },
      { isDeleted: true, deletedAt: Date(), status: "cancelled" },
      { new: true }
    );
    console.log("error");
    return res.status(200).send({
      message: "order has been cancelled successfully",

      Cancelled_Order: cancelledOrder,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//vendor can give any date in body, and get the details of all sold specific product data upto present date
exports.getSoldProductDataUptoPresentDate = async (req, res) => {
  try {
    let date = req.body.uptoDate;

    let countOfProduct = await orderModel
      .find({
        status: "completed",
        isDeleted: false,
        createdAt: { $gte: date },
      })
      .count();
    let getProduct = await orderModel.find({
      status: "completed",
      isDeleted: false,
      createdAt: { $gte: date },
    });
    if (countOfProduct === 0) {
      return res
        .status(400)
        .send({
          msg: "No sold product found from that given date till present date or enter a valid date",
        });
    }
    return res
      .status(200)
      .send({ status: true, count: countOfProduct, data: getProduct });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get details of a specific sold product , vendor can give any two dates in body and get the data of a sold product for specific dates
exports.fetchHistoryBetweenTwoDate = async (req, res) => {
  try {
    fromDate = req.body.fromDate;
    toDate = req.body.toDate;

    let countOfProduct = await orderModel
      .find({
        status: "completed",
        isDeleted: false,
        createdAt: { $gte: fromDate, $lte: toDate },
      })
      .count();

    const getProduct = await orderModel.find({
      status: "completed",
      isDeleted: false,
      createdAt: { $gte: fromDate, $lte: toDate },
    });
    if (countOfProduct === 0) {
      return res
        .status(400)
        .send({
          msg: "No sold product found in between these two dates or enter a valid date",
        });
    }
    return res
      .status(200)
      .send({ status: true, count: countOfProduct, data: getProduct });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//fetch data between two data with product id
exports.fetchHistoryBetweenTwoDateWithProductId = async (req, res) => {
  try {
    fromDate = req.body.fromDate;
    toDate = req.body.toDate;
    let productId = req.body.productId;
    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .send({ status: false, msg: "product id is not valid" });
    }
    let countOfProduct = await orderModel
      .find({
        status: "completed",
        /*isDeleted : false,*/ createdAt: { $gte: fromDate, $lte: toDate },
        items: { $elemMatch: { productId: req.body.productId } },
      })
      .count();

    let getproducts = await orderModel.find({
      status: "completed",
      /*isDeleted : false,*/ createdAt: { $gte: fromDate, $lte: toDate },
      items: { $elemMatch: { productId: req.body.productId } },
    });

    if (countOfProduct === 0) {
      return res
        .status(404)
        .send({
          status: false,
          msg: "this product is not sold in between given dates or enter a valid date",
        });
    }

    return res
      .status(200)
      .send({
        status: true,
        count: countOfProduct,
        msg: "data",
        data: getproducts,
      });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};
