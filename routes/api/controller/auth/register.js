const User = require("../../models/schemas/userSchema");
const bcrypt = require("bcrypt");
const HTTP_CODES = require("../../../../helpers/httpStatusCodes");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(HTTP_CODES.CONFLICT).json({
        status: "error",
        code: 409,
        message: "Already register",
      });
    }
    const salt = bcrypt.genSaltSync(15);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ email, password: hashedPassword });

    res.status(HTTP_CODES.CREATED).json({ email, password: newUser.password });
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = register;
