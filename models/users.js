const {
  createUser,
  verifyUser,
  changeSubStatus,
} = require("../services/users");
const User = require("../services/usersSchema");

const signup = async (req, res, next) => {
  try {
    const { email, subscription } = await createUser(req.body);
    res.status(201).json({
      user: {
        email: email,
        subscription: subscription,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email in use" });
      return;
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await verifyUser(req.body);

    if (!user) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }
    res.status(200).json({
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email: email, subscription: subscription });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;

    const matchesAllowedSubs = ["starter", "pro", "business"].includes(
      subscription
    );
    if (!matchesAllowedSubs) {
      throw new Error(
        'Subscription status must be one of following values: ["starter", "pro", "business"]'
      );
    }
    changeSubStatus(_id, subscription);
    res
      .status(200)
      .json({ message: "Subscription status has been changed succesfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, getCurrentUser, updateSubscription };
