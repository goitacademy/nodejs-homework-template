const express = require('express');
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const {User} = require("../../models/user");
const {authenticate} = require("../../middlewares")
const {schemas} = require("../../models/user");
const {RequestError} = require("../../helpers")
const {SECRET_KEY} = process.env;

const router = express.Router();

router.post("/register", async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw RequestError(409, "email already in use")
    }
    try {
        const {error} = schemas.registerSchema.validate(req.body);
    
        if (error) {
          throw RequestError(400, error.message)
        }

        const hashPassword = await bcryptjs.hash(password, 10)

        const newUser = await User.create({...req.body, password: hashPassword});
        res.status(201).json({
            email: newUser.email,
            name: newUser.name,
            subscription: newUser.subscription,
        });
      } 
      catch (error) {
        next(error)
      }
});

router.post("/login", async (req, res, next) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(!user) {
      throw RequestError(401, "Email or password is wrong")
  }
  try {
  const {error} = schemas.loginSchema.validate(req.body);
  
  if (error) {
      throw RequestError(400, error.message)
    }

const passwordCompare = await bcryptjs.compare(password, user.password);
if (!passwordCompare) {
  throw RequestError(401, "Email or password is wrong")
}

const payload = {
  id: user._id,
}
const {subscription} = user;
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
await User.findByIdAndUpdate(user._id, {token});

      res.status(200).json({
         token, 
         email,
         subscription,
      });
    } 

    catch (error) {
      next(error)
    }
});

router.post("/current", authenticate, async (req, res, next) => {
  try {
  const {email, name} = req.user;
  res.json({
    email, 
    name
  })

  } 
  catch (error) {
    next(error)
  }
})

router.post("/logout", authenticate, async (req, res, next) => {
  try {
    const {_id, email, subscription} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    res.json({
      email, 
      subscription, 
      message: "logout successfull",
    })
  
    } 
    catch (error) {
      next(error)
    }
})

module.exports = router;