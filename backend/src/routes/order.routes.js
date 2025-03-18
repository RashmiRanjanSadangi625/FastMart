const express = require("express");
const router = express.Router();


const orderController =require("../controller/order.controller");
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate,orderController.createOrder);
router.get("/user",authenticate,orderController.orderHistory)
router.get("/:id",authenticate,orderController.findOrderById);
router.get("/", authenticate, orderController.getOrders);

// orderstatus related routes

router.put("/:orderId/confirmed", authenticate, orderController.confirmOrder);
router.put("/:orderId/shipped", authenticate, orderController.shipOrder);
router.put("/:orderId/delivered", authenticate, orderController.deliverOrder);
router.put("/:orderId/cancelled", authenticate, orderController.cancelOrder);
router.delete("/:orderId/delete", authenticate, orderController.deleteOrder);




module.exports=router; 
