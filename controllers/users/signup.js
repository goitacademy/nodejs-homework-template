const { User, signupSchema } = require("../../models");
const { requestError } = require("../../helpers");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  console.log("test: ");
  console.log("req.body: ", req.body);
  try {
    const { error } = signupSchema.validate(req.body);

    console.log("error: ", error);
    if (error) {
      throw requestError(400, error.message);
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw requestError(409, "Email in use");
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log("hashPassword: ", hashPassword);

    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
