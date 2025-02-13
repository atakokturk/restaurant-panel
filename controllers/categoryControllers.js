//CREATE CATEGORY
const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageURL } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageURL });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created.",
      newCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      err,
    });
  }
};
// get all categories
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      totalCate: categories.length,
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get All Categories API",
      err,
    });
  }
};

//update category

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageURL } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageURL },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Update Categories API",
      err,
    });
  }
};
//delete category

const deleteCategoryController = async (req, res) => {
  try {
    const categoryID = req.params.id;
    if (!categoryID) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    const categories = await categoryModel.findByIdAndDelete(categoryID);
    res.status(200).send({
      success: true,
      message: "Category has been deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Delete Categories API",
      err,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};




