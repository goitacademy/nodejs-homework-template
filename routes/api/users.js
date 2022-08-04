const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const User = require("../../models/user");

const { authorize} = require("../../middlewares");
const { createError } = require("../../helpers");

const router = express.Router();
const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });
  
  const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });
  
 

  // signup
  router.post("/register", async(req, res, next) => {
    try {
        const {error} = userRegisterSchema.validate(req.body);
        if(error) {
            throw createError(400, error.message);
        }
        const {email, password, name} = req.body;
        const user = await User.findOne({email});
        if(user) {
            throw createError(409, "Email already exist");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await User.create({email, password: hashPassword, name});
        res.status(201).json({
            name: result.name,
            email: result.email,
        })
    } catch (error) {
        next(error);
    }
})

// signin
router.post("/login", async(req, res, next) => {
    try {
        const {error} = userLoginSchema.validate(req.body);
        if(error) {
            throw createError(400, error.message);
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw createError(401, "Email wrong");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            throw createError(401, "Password wrong");
        }
       
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})
        await User.findByIdAndUpdate(user._id, {token});
        res.json({
            token
        })
    } catch (error) {
        next(error);
    }
})

router.get("/logout", authorize, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const user = await User.findById(_id);
      if (!user) {
        throw createError(401, "Not authorized");
      }
      await User.findByIdAndUpdate(_id, { token: "" });
  
      res.status(204);
    } catch (error) {
      next(error);
    }
  });

  router.get("/current", authorize, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const user = await User.findById(_id);
      if (!user) {
        throw createError(401, "Not authorized");
      }
  
      res.json({
        email: user.email,
        subscription: user.subscription,
      });
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;