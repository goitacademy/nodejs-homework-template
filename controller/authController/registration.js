// const UserSchema = require("../../models/userSchema");
require("dotenv").config();
// const bcrypt = require("bcryptjs");
const registrationServices = require("../../services/authServise/registrationServices");

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
     const body = req.body;
    const user = await registrationServices(email, password, body);
   
    res.status(201).json({
        status: "Created",
        code: 201,
        message: `create ${email} and ${password}sucsess`
      });
   return user 
  } catch (error) {
    next(error);
  }
};
module.exports = registration;
