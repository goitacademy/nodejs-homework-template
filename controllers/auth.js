const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BASE_URL = process.env.DATABASE_URI;

mongoose
  .connect(BASE_URL)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // Register User
async function register(req, res, next) {
  const { email, password, subscription } = req.body;
  console.log("Received data:", req.body);
  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    const addUser = await User.create({
      email,
      password: passwordHash,
      subscription,
    });
    res
      .status(201)
      .send({ email: addUser.email, subscription: addUser.subscription });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// Login User
async function login(req, res, next){
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email}).exec();

    if(user === null){
      return res.status(401).send({message: "Email or password is wrong"})
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch === false){
      return res.status(401).send({message: "Email or password is wrong"})
    }

    const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: 1000})

    res.send({token})
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  register,
  login,
};
