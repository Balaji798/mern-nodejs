const express = require('express');
const router = express.Router();


const userController = require("../controllers/user");
const middleware = require("../middleware/authenticateUser");

router.post('/add-user',userController.user_signup);
router.post('/login-user',userController.login);
// router.put('/update',middleware.authenticateToken,userController.userUpdate);

module.exports=router; 