const Auth = require("../../models/auth");
const signUpSchema = require("../../schemas/Joi/signUpSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req, res, next) => {
  try {
    const { error } = signUpSchema.validate(req.body);
    const { email, password } = req.body;

    if (error) {
      res.status(400).json({ message: error.message });
    }

    const user = await Auth.findOne({ email }).exec();
    const isComparedPass = await bcrypt.compare(password, user.password);
    const { Unauthorized } = require("http-errors");

    const { JWT_CODE } = process.env;
    const token = jwt.sign({ id: user.id }, JWT_CODE, { expiresIn: "7d" });

    if (!isComparedPass) {
      throw next(Unauthorized("email or password is not valid"));
    }

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signIn;
