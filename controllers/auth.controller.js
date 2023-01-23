const bcrypt = require("bcrypt");
const { httpError } = require("../helpers/helpers");
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = await User.create({ email, password: hashedPassword });
    return res.status(201).json({ user: { email, id: savedUser._id } });
  } catch (error) {
    if (error.code === 11000) {
      next(httpError(409, "Email in use"));
    }
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const storedUser = await User.findOne({ email });

    if (!storedUser) {
      throw new httpError(401, "Email is wrong");
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
      throw new httpError(401, "Password is wrong");
    }

    const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userWithChangedToken = await User.findOneAndUpdate(
      { email },
      { token },
      { new: true }
    );

    return res.status(200).json({
      token,
      user: {
        email: userWithChangedToken.email,
        subscription: userWithChangedToken.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      throw new httpError(401, "Not authorized");
    }

    const logoutUser = await User.findByIdAndUpdate(_id, { token: null });

    return res.status(204).json(logoutUser);
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const { user } = req;

    if (!user) {
      return next(httpError(401, "Not authorized"));
    }
    const { email, subscription } = user;
    return res.status(200).json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}
async function subscriptionUpdate(req, res, next) {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      throw new httpError(401, "Not authorized");
    }

    const userWithUpdatedSubscriptionType = await User.findByIdAndUpdate(
      _id,
      {
        subscription,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(userWithUpdatedSubscriptionType);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout,
  current,
  subscriptionUpdate,
};
