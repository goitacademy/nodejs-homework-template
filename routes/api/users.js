const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { NotFound, BadRequest, Conflict, Unauthorized } = require("http-errors");

const { JoiSchemas } = require("../../models/user");

const { User } = require("../../models/user");
const authenticate = require("../../helpers/authenticate");

router.post("/register", async (req, res, next) => {
  try {
    const { error } = JoiSchemas.userRegistrationJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequest("Помилка від Joi або іншої бібліотеки валідації");
    }

    const { email, password } = req.body;
    console.log(password);
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    // password hash AWAIT!!!!!!!!!
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        email: result.email,
        sunscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/login", async (req, res, next) => {
  try {
    const { error } = JoiSchemas.userLoginJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequest("Помилка від Joi або іншої бібліотеки валідації");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("E-mail or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new Unauthorized("E-mail or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(201).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

router.get("/current", authenticate, async (req, res, next) => {
  try {
    const user = req.user;
    const result = { email: user.email, subscription: user.subscription };
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
