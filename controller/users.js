const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { createUser, findUserByEmail } = require("../service");
const User = require("../service/schemas/users");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const auth = async (req, res, next) => {
  try {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (!user || err) {
        return res.status(401).json({ message: "Not authorized" });
      }

      req.user = user;
      next();
    })(req, res, next);
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signupSchema.validate({ email, password });

    if (error) {
      return res.status(400).json({ message: "Validation error" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      subscription: "starter",
    });

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = body;
    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return res.status(400).json({ message: "Validation error" });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Wrong email" });
    }

    const authMatch = bcrypt.compare(password, user.password);
    if (!authMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const secret = process.env.SECRET;
    const payload = {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await User.findByIdAndUpdate(userId, { token: null });

    return res.status(204).send();
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const current = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  })(req, res, next);
};

module.exports = {
  signup,
  login,
  auth,
  logout,
  current,
};

