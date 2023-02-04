const express = require('express');
const router = express.Router();


const orderController = require("../controllers/order");
const middleware = require("../middleware/authenticateUser");

router.post("/place-order",middleware.authenticateToken,orderController.make_order);
router.delete("/cancel-order",middleware.authenticateToken,orderController.cancel_order);

router.get('/getProductUptoPresentDate',orderController.getSoldProductDataUptoPresentDate)
router.get('/fetchHistorybydate',orderController.fetchHistoryBetweenTwoDate)
router.get('/dataByDateWithProductId',orderController.fetchHistoryBetweenTwoDateWithProductId)
module.exports = router;