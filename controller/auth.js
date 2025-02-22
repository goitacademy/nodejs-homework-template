const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../service/schemas/user");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user !== null) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: `Email in use`,
      });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });

    return res
      .json({
        status: "success",
        code: 201,
        user: {
          email: "example@example.com",
          subscription: "starter",
        },
      })
      .end();
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(401).json({ error: "email or password is wrong am" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return res.status(401).json({ error: "email or password is wrong ps" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    await User.findByIdAndUpdate(user.id, { token });
    res.json({
      status: "success",
      code: 200,
      data: { token, email, subscription },
    });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  const { id } = req.user;

  try {
    await User.findByIdAndUpdate(id, { token: "" });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

const checkCurrent = async (req, res, next) => {
  try {
    console.log(req.user);
    const { email, subscription, id } = await req.user;
    return res.json({ status: "success", code: 200, email, subscription, id });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, checkCurrent };
