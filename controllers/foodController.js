const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// create food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    if (!title || !description || !restaurant || !price) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New food item created",
      newFood,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Create Food API",
      err,
    });
  }
};

//GET ALL FOOD

const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "Food is not found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get all Food API",
      err,
    });
  }
};

//GET SINGLE FOOD

const getSingleFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "Please Provide ID",
      });
    }

    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food with this ID",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get single Food API",
      err,
    });
  }
};

//GET FOOD BY RESTAURANT

const getFoodByRestaurantFoodController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    if (!restaurantID) {
      return res.status(404).send({
        success: false,
        message: "Please Provide ID",
      });
    }

    const food = await foodModel.find({ restaurant: restaurantID });
    console.log(food);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food with this ID",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food base on restaurant",
      food,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in byrestaurant API",
      err,
    });
  }
};
//update food

const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "Food not found with this ID",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    const {
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageURL,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item has updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Update food API",
      err
    });
  }
};

//delete food
const deleteFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "Please provide Food ID",
      });
    }
    const foods = await foodModel.findByIdAndDelete(foodID);
    res.status(200).send({
      success: true,
      message: "Food Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Delete food API",
      err,
    });
  }
};

//place order

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    let total = 0;
    //cal
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Place Order API",
      error,
    });
  }
};

//order stat

const orderStatusController = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!orderID) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderID,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order status updated",
    });
  } catch (err) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Order Status API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantFoodController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
