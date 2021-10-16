const { Conflict } = require("http-errors");
const { User } = require("../../schemas");
const bcrypt = require("bcryptjs");
// require('dotenv').config()
const register = async (req, res) => {
  if (req.body.email === null || req.body.password === null) {
    res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: "Ошибка от Joi или другой библиотеки валидации",
    });
    return;
  }

  const { email, password } = req.body;

  console.log(email, password);
  console.log(User);

  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    throw new Conflict("Email in use");
    // res.status(409).json({
    //     Status: "Conflict",
    //     message: "Email in use",
    // });
    // return;
  }
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // await User.create({ email, password: hashPassword });
  const newUser = new User({ email });
  // newUser = { email }
  newUser.setPassword(password);
  // newUser = { email, password }
  const result = await newUser.save();

  //   const hashPasword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  //   await User.create({ email, password: hashPasword })
  res.status(201).json({
    code: 201,
    message: "register success",
    result
    // data: {
    //   token,
    // },
  });
};;
module.exports = register;
