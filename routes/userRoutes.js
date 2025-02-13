const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  changePasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//GET USER - GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUserController);

//password update
router.post("/changePassword", authMiddleware, changePasswordController);

//reset password
router.post("/resetPassword", authMiddleware, resetPasswordController);

//delete user

router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;



