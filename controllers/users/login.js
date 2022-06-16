const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!user || !passwordCompare) {
      throw new Unauthorized(`Email or password is wrong`);
    }

    // Вариант с созданием методов модели для хэширования
    //  if (!user || !user.comparePassword(password)) {
    // throw new Unauthorized(`Email or password is wrong`);
    //   }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(201).json({
      status: "success",
      code: 200,
      data: {
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
