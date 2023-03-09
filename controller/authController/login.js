const UserSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const secret = process.env.SECRET


const login = async(req, res, next)=>{
    const { email, password } = req.body;
    try {
      const user = await UserSchema.findOne({ email });

      if (!user || !user.validPassword(password)) {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: "Incorrect login or password",
          data: "Bad request",
        });
      }

      const { _id: id } = user;

      const token = jwt.sign({ id }, secret, { expiresIn: "1h" });
      res.status(200).json({
        status: "OK",
        code: 200,
        user: {
          email: user.email,
          token: token,
        },
      });
    } catch (error) {
      next(error);
    }
}
module.exports=login