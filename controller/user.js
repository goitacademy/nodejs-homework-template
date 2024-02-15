const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/users.schema");
const {
  loginValidation,
  signupValidation,
} = require("../validators/user.validation");

const login = async (email, password) => {
  const { error } = loginValidation({ email, password });
  if (error) {
    throw new Error(error.details[0].message);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email or password is wrong");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();

    return {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signup = async (email, password) => {
  try {
    const { error } = signupValidation({ email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email in use");
    }

    const newUser = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    newUser.subscription = "starter";

    await newUser.save();

    return {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const current = async (user) => {
  return {
    email: user.email,
    subscription: user.subscription,
  };
};

const logout = async (user) => {
  try {
    if (!user) {
      throw new Error("Not authorized");
    }

    user.token = null;
    await user.save();

    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { login, current, signup, logout };
