const express = require("express");
const router = express.Router();
const { registerJoiSchema, loginJoiSchema } = require("../../models/user");
const { User } = require("../../models/user");
const { Conflict,Unauthorized } = require("http-errors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = registerJoiSchema.validate(req.body);
    const { email, password } = req.body;

    if (error) {
      error.status = 400;
      throw error;
    }
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    // 1) способ хешировать password регістр
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // const result = await User.create({ email, password: hashPassword });

    // 2) способ хешировать password ругістр
    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          password,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = loginJoiSchema.validate(req.body);
    const { email, password } = req.body;

    if (error) {
      error.status = 400;
      throw error;
    }
    const user = await User.findOne({ email });

    // 1) спосіб логін
    // if (!user) {
    //   throw new Unauthorized("Email or password is wrong");
    // }
    // const passCompare = bcrypt.compareSync(password, user.password);
    // if (!passCompare) {
    //   throw new Unauthorized("Email or password is wrong");
    // }

    //2 ) спаосіб
    if (!user || !user.comparePassword(password)) {
      throw new Unauthorized("Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
