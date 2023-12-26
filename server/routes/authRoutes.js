const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//Test controller
router.get("/test", requireSignIn, isAdmin, testController);

module.exports = router;
