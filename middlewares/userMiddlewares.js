
const User = require("../models/users.js");
const Joi = require("joi");
const { PASSWD_REGEX } = require("../constats/regex.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secKey = process.env.JWT_SECRET;

const registrationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().regex(PASSWD_REGEX).required(),
});
exports.userMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = registrationSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      subscription: "starter",
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser.id }, secKey, {
      expiresIn: "1d",
    });
    savedUser.token = token;
    await savedUser.save();
    res.status(201).json({
      user: { email: savedUser.email, subscription: savedUser.subscription },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

exports.loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const token = jwt.sign({ userId: user.id }, secKey, { expiresIn: "2h" });
    user.token = token;
    await user.save();
    user.password = undefined;
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "not authorize" });
    }
    const decoded = await jwt.verify(token, secKey);
    console.log('User', decoded, bearer)

    const user = await User.findById(decoded.userId);

    if (!user || token !== user.token) {
      console.log("Invalid token or user not found");
      return res.status(401).json({ message: "not authorize" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in checkToken:", error.message);
    return res.status(401).json({ message: "Not authorized" });
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email || !req.user.subscription) {
      console.log("Invalid user data", req.user);
      return res.status(401).json({ message: "Not authorized" });
    }

    const currentUserData = {
      email: req.user.email,
      subscription: req.user.subscription,
    };

    res.status(200).json(currentUserData);
  } catch (error) {
    console.error("Error in currentUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logoutMiddleware = async (req, res, next) => {
  
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {token: ""})
  res.status(204).send();

};
