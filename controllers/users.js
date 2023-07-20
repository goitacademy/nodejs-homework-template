
const {registerSchema} = require("../schemas");
const {loginSchema} = require("../schemas");
const {HttpError} = require("../helpers");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;

const User = require("../models/user");

const register = async (req, res, next) => {
    try {
      
      const {error} = registerSchema.validate(req.body);
      
      if(error) {
        throw HttpError(400, error.message);
      }

      const {email, password} = req.body;
      const user = await User.findOne({email});

      if(user){
        throw HttpError(409, "Email already in use");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({...req.body, password: hashPassword});
      
      res.status(201).json({
        password: newUser.password,
        email: newUser.email,
      })
    }
    catch(error) {
      next(error);
    }
}

const login = async (req, res, next) => {
  try {
    const {error} = loginSchema.validate(req.body);
    
    if(error) {
      throw HttpError(400, error.message);
    }
    
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    // const token = "dfkjddlkfjbdfkjd;bd;flkb;d";

    res.json({
      token,
    })
  }
  catch(error) {
    next(error);
  }

}

module.exports = {
    register,
    login
}