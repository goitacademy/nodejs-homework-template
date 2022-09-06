const { registration, login } = require("../services/authServices");

const registrationControlls = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await registration(email, password);
    return res.status(201).json({
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (error) {
    return res.status(409).json({ message: "Email in use" });
  }
};

const loginControlls = async (req, res, next) => {
  const { email, password } = req.body;
  const { user, token } = await login(email, password);

  if (user) {
    return res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  }
};

const logoutControlls = async (req, res, next) => {
  const token = req.token;
  if (token) {
    return res.status(204).json("No Content");
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

const currentControlls = async (req, res, next) => {
  const userId = req.user;

  if (userId) {
    const { email, subscription } = userId;
    return res.status(200).json({ email, subscription });
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  registrationControlls,
  loginControlls,
  logoutControlls,
  currentControlls,
};
