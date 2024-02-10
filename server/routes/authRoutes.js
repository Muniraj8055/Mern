const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//FORGOT PASSWORD
router.post("/forgot-password", forgotPasswordController);

//Test controller
router.get("/test", requireSignIn, isAdmin, testController);

//user-Protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ success: true });
});

//Admin-Protected route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ success: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);
//orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = router;
