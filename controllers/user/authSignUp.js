const User = require("../../models/user-model/User");
const { validateBody } = require("../../schemas/userScheme");
const { userSignUpSchema } = require("../../schemas/userScheme");
const bcrypt = require("bcryptjs");

signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = validateBody(req.body, userSignUpSchema);
    const user = await User.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 10);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    } else if (user) {
      res.status(409).json({ message: "Email already exist" });
    } else {
      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
      });
      res.status(201).json(req.body);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
};
