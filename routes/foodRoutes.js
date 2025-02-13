const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantFoodController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//routes
//create foods

router.post("/create", authMiddleware, createFoodController);

//get all food
router.get("/getAll", getAllFoodController);

//get single food
router.get("/get/:id", getSingleFoodController);

//get by restaurant
router.get("/getByRestaurant/:id", getFoodByRestaurantFoodController);

//update food
router.put("/update/:id", authMiddleware, updateFoodController);

//delete food
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//place order
router.post("/placeOrder", authMiddleware, placeOrderController);

//ORDER STATUS
router.post("/orderStatus/:id", authMiddleware, adminMiddleware, orderStatusController);
module.exports = router;



