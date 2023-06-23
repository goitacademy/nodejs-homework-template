const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const { auth } = require("../../auth/auth.js");
const {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
} = require("../../controllers/users.js");

const { issueToken } = require("../../auth/issueToken.js");

const { userValidationSchema } = require("../../models/user.js");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }

  const newUser = await getUserByEmail(email);

  if (newUser) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const user = await createUser(email, password);
    return res.status(201).json({
      status: "Created",
      code: 201,
      message: "Registration successful",
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }

  const user = await getUserByEmail(email);
  const userPassword = user.password;

  const passwordCorrect = bcrypt.compareSync(password, userPassword);

  if (!user || !passwordCorrect) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Email or password is wrong",
      data: "Bad request",
    });
  }

  try {
    const token = issueToken(user);

    const newData = { token: token };
    await updateUser(user._id, newData);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/logout", auth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newData = { token: null };
    await updateUser(_id, newData);
    return res.status(204).json({
      message: "Logged out",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/current", auth, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = router;