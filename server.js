const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();


//DB Connection

connectDB();

//rest object

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));



const PORT = process.env.PORT || 7000;

//PORT and listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});


