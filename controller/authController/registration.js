const UserSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const secret = process.env.SECRET

const  registration =async(req, res, next)=> {
    try {
      const { email, password } = req.body;
      const user = await UserSchema.findOne({ email });
      if (user) {
        res.status(409).json({
          status: "Conflict",
          code: 409,
          data: { message: `User with ${email} already exist ` },
        });
      }

      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const newUser = await UserSchema.create({
        email,
        password: hashPassword,
      });
      res.status(201).json({
        status: "Created",
        code: 201,

        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  module.exports=registration;