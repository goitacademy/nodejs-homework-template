const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactsRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/users", userRoutes);
app.use("/contacts", contactRoutes);
app.use("/protected", protectedRoutes);

module.exports = app;
