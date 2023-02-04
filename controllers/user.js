const customerModel = require("../model/user.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

exports.user_signup = async (req, res) => {
  try {
    let {
      name,
      phoneNumber,
      password,
    } = req.body;
    let phone= phoneNumber
    const dataExist = await customerModel.findOne({ phoneNumber: phoneNumber });
    if (dataExist){
      return res.status(400).send({ message: "email already in use" });
    }
  //   if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
  //     return res.status(400).send({ status: false, message: "Please provide valid Email Address" });
  // }
   
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const userRequest = {
      name,
      phone,
      password,
    };
    const userData = await customerModel.create(userRequest);
    return res
      .status(201)
      .send({ message: "User signup successfully", data: userData });
  } catch (err) {
    console.log(err.message)
    return res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;

    const dataExist = await customerModel.findOne({ phoneNumber: phoneNumber });
    if (!dataExist)
      return res.status(404).send({ message: "user dose not exist" });
    const { _id, name} = dataExist;
    const validOtp = await bcrypt.compare(password, dataExist.password);
    if (!validOtp) return res.status(400).send({ message: "Invalid OTP" });
    const payload = { userId: _id, phoneNumber: phoneNumber };
    const generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {   
      expiresIn: "10080m",
    });
    res.header("jwt-token", generatedToken);
    return res
      .status(200)
      .send({
        message: `${name} you are logged in Successfully`,
        Token: generatedToken,
      });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

