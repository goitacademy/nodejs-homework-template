const service = require("../service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  existingUser,
  saveNewUser,
  loginResponse,
} = require("../service/index");
const { validateUser } = require("../service/validator");

const signup = async (req, res, next) => {
  const { error } = validateUser(req.body);
  const { email } = req.body;

  try {
    const result = await service.existingUser({ email });
    if (result) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      email: req.body.email,
      password: hashedPassword,
    };
    const savedUser = await saveNewUser(newUser);

    return res.status(201).json({
      user: {
        email: savedUser.email,
        subscription: savedUser.subscription,
      },
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};

const login = async (req, res, next) => {
  const { error, email, password } = validateUser(req.body);

  try {
    if (error) {
      return res.status(400).json({ message: "Validation error" });
    }

    const user = await service.existingUser({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();

    return loginResponse(res, token, user.email, user.subscription);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
    next(e);
  }
};

module.exports = {
  signup,
  login,
};
