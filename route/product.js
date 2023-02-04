const express = require('express');
const router = express.Router();


const productControllers = require("../controllers/product");
const middleware = require("../middleware/authenticateUser");


router.post("/add_product",productControllers.add_product);
router.put("/edit_product/:productId",productControllers.edit_product);
router.get("/get_products",productControllers.get_products);
router.put("/delete_product/:productId",middleware.authenticateToken,productControllers.delete_product);
router.get("/product",productControllers.get_specific_product);
router.post("/add-to-wishlist",productControllers.add_to_wishlist);
router.post("/remove_wishlist",middleware.authenticateToken,productControllers.remove_from_wishlist);
router.get("/newArivalProduct",middleware.authenticateToken,productControllers.newArivalProduct);


module.exports = router;