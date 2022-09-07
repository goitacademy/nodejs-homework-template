const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../../models/users");
const createError = require("../../helpers/createError");
const authorize = require('../../middlewares/authorization')
const { SECRET_KEY } = process.env;

const usersSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) {
      throw createError(400, "Bad request");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      email: result.email,
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) {
      throw createError(400, "Bad request");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw createError(401, "Email or password is wrong");
    }
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user.id, { token });
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw createError(401, "Not authorized");
    }
    await User.findByIdAndUpdate(id, {token: null})
    res.status(204).json({message: "No content"})
  } catch (error) {
    next(error);
  }
});


router.get('/current', authorize, async (req, res, next)=> {
    const {email, subscription} = req.user
    res.json({
        email,
        subscription
    })
})

module.exports = router;
