const { signupServicesValidate } = require("../services/userServices");
const userServices = require("../services/userServices");
const User = require("../model/userModel");
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Если пользователь существует, возвращаем сообщение об ошибке
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const userData = await userServices.registrationServices(email, password);
    return res.json(userData);
  } catch (error) {
    console.log(error);
  }
  // const { user, token } = await signupServicesValidate(req.body);
  // res.status(201).json({ msg: "signup successful" });
};

exports.login = async (req, res) => {};
