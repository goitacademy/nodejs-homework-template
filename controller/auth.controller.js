const User = require("../models/user.model");


const signup = async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (user) {
        return res
        .status(409)
        .header("Content-Type", "application/json")
        .json({
          status: "conflict",
          code: 409,
          ResponseBody: {
            message: "Email in use",
          },
        });
      }
      try {
        const newUser = new User({ email });
        newUser.setPassword(password);
        await newUser.save();
        res
          .status(201)
          .header("Content-Type", "application/json")
          .json({
            status: "created",
            code: 201,
            ResponseBody: {
              user: {
                email: "example@example.com",
                subscription: "starter",
              },
            },
          });
      } catch (error) {
          next(error);
      }
  };
  const login = async (req, res, next) => {

  };
  module.exports = {
      signup,
      login,
  }