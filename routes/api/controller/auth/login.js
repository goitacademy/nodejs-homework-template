const User = require("../../models/schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_CODES = require("../../../../helpers/httpStatusCodes");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (!candidate) {
      return res
        .status(HTTP_CODES.UNAUTHORIZED)
        .json({ error: "Wrong credentials" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, candidate.password);

    if (!isPasswordCorrect) {
      return res
        .status(HTTP_CODES.UNAUTHORIZED)
        .json({ error: "Wrong credentials" });
    }
    const { JWT_SECRET_KEY } = process.env;

    const payload = {
      email,
      id: candidate._id,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });

    await User.findOneAndUpdate({ _id: candidate._id }, { token });

    res.status(HTTP_CODES.OK).json({ token });
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: error.message });
    next(error);
  }
};

module.exports = login;
