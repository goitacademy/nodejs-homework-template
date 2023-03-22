const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Unauthorized } = require("http-errors");

const { User } = require("../../schemas/userSchema");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!user || !passCompare) {
      throw new Unauthorized(`Email or password is wrong`);
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
