const mongoose = require("mongoose");
const User = require("../models/user");
// const joiUserSchemas = require("../schemas/userSchemas");
const BASE_URL = process.env.DATABASE_URI;

mongoose
  .connect(BASE_URL)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function register(req, res, next) {
  const { email, password, subscription } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user === null) {
      return res.status(409).send({ message: "Email in use" });
    };

    const addUser = await User.create({ email, password, subscription });
    res.status(201).send(addUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  register,
};
