const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIDController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

//routes
//Create Restaurant || POST
router.post("/create", authMiddleware, createRestaurantController);

//get ALL Restaurants  || GET
router.get("/getAll", getAllRestaurantController);

//GET RESTAURANTS BY ID ||GET
router.get("/get/:id", getRestaurantByIDController);

//delete restaurant || DELETE

router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;



