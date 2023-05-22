const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
//body parser middleware
app.use(express.json());
//routes
const postRoutes = require("./Routes/api/posts");
const { MONGO_URL } = require("./config");
app.get("/", (req, res) => {
  res.send("hello from aditi");
});
//connect mongo db
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//use routes
app.use("/api/posts", postRoutes);
const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
