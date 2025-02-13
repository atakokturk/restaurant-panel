const mongoose = require("mongoose");

//func mongodb db connection

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database ${mongoose.connection.host} `);
  } catch (err) {
    console.log("DB Error", err);
  }                                                    
};

module.exports = connectDB;



