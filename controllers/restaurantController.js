const restaurantModel = require("../models/restaurantModel");
//create restaurant
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "New restaurant has created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in create restaurant API",
      err,
    });
  }
};
//get all restaurants
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurant available",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurants get successfully",
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get ALL Restaurant API",
      err,
    });
  }
};
//get restaurant by ID
const getRestaurantByIDController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    if (!restaurantID) {
      return res.status(404).send({
        success: false,
        message: "Please provide Restaurant ID",
      });
    }
    //find restaurant
    const restaurants = await restaurantModel.findById(restaurantID);
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant found",
      restaurants,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurant API",
      err,
    });
  }
};
//delete restaurant

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    if (!restaurantID) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Restaurant ID",
      });
    }
    const restaurants = await restaurantModel.findByIdAndDelete(restaurantID);
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      err,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIDController,
  deleteRestaurantController,
};
