const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const { HttpError } = require("../helpers/error-func");

require("dotenv").config();
const { JWT_SECRET } = process.env;

async function signupUser(req, res, next) {
    const { password, email, subscription } = req.body;

    try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = await User.create({
        password: hashedPassword,
        email,
        subscription,
    });

    res.status(201).json({
        user: {
            email,
            subscription,
            id: savedUser._id,
        },
    });
    } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
        return next(HttpError(409, "Email already in use"));
    }

    return next(HttpError(400, error.message));
  }
};

async function loginUser(req, res, next) {
  const { password, email } = req.body;
    
  const storedUser = await User.findOne({email});
    if (!storedUser) {
      return next(HttpError(401, "Email is wrong! Try again."));
    };

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
        return next(HttpError(401, "Password is wrong! Try again."));
    };

    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    await User.findByIdAndUpdate(storedUser._id, { token });
    return res.status(200).json({
        token,
        user: {
            email,
            subscription: storedUser.subscription,
        },
    });
}

async function logoutUser(req, res, next) {
    const { _id } = req.user;
    
    const storedUser = await User.findByIdAndUpdate(_id, { token: null });
    if (!storedUser) {
        return next(HttpError(401, "Not authorized!"));
    };

    return res.status(204).json();
}

async function currentUser(req, res, next) {
    const { user } = req;
    const { email, subscription } = user;
    
    if (!user) {
        return next(HttpError(401, "Not authorized!"));
    };

    return res.status(200).json({
        email,
        subscription,
    });
}

async function updateUser(req, res, next) {
    const { _id } = req.user;
    const { subscription } = req.body;

    const updatedUser = await User.findByIdAndUpdate(_id, { subscription });
    if (!updatedUser) {
        return next(HttpError(401, "Not authorized!"));
    };

    return res.status(200).json({
        subscription: storedUser.subscription,
    });
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    currentUser,
    updateUser
};