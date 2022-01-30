const express = require("express");
const { BadRequest, Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { User } = require("../../model");
const { joiRegisterSchema, joiLoginSchema } = require("../../model/user");

const router = express.Router();

const { SECRET_KEY } = process.env;

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { name, email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    /*
    Option 2
     */
    // const newUser = new User({name, email});
    /*
     newUser = {email, name}
     */
    // newUser.setPassword(password);
    // const result = newUser.save();
    const salt = await bcrypt.genSalt(10);
    // console.log("salt", salt);
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log("hashPassword", hashPassword);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
      subscription,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new Unauthorized("Password is wrong");
    }
    /*
    Option 2
     */
    // if(!user){
    //     throw new Unauthorized("Email not found")
    // }
    // // const passwordCompare = user.comparePassword(password);
    // const passwordCompare = await bcrypt.compare(password, user.password);
    // if(!passwordCompare){
    //     throw new Unauthorized("Password wrong")
    // }

    const { _id, name, subscription } = user;
    const payload = {
      id: _id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    // console.log(token);
    await User.findByIdAndUpdate(_id, { token });
    res.json({
      token,
      user: { email, name, subscription },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
