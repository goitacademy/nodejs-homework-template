const registerSchema = require("../schemas");
// const loginSchema = require("../schemas");
const {HttpError} = require("../helpers");
const User = require("../models/user");

const register = async (req, res, next) => {
    try {
      const {error} = registerSchema.validate(req.body);
      
      if(error) {
        throw HttpError(400, error.message);
      }
      const newUser = await User.create(req.body);
      res.json({
        password: newUser.password,
        email: newUser.email,
      })
    }
    catch(error) {
      next(error);
    }
}

module.exports = {
    register
}