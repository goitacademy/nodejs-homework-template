import { Router } from "express";
import Joi from "joi";
import { UserModel } from "../../models/users/userShema.js";
import { auth } from "../../middlewares/auth.js";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET_KEY;
import jwt from "jsonwebtoken";

const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
    "string.empty": "missing required email field",
    "string.email": "email must be a valid email address",
  }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/) // Co najmniej jedna litera i jedna cyfra
    .required()
    .messages({
      "any.required": "missing required password field",
      "string.empty": "missing required password field",
      "string.min": "password must be at least 8 characters long",
      "string.max": "password must not exceed 32 characters",
      "string.pattern.base":
        "password must contain at least one letter and one number",
    }),
});

const router = Router();

router.post("/users/signup", async (req, res, next) => {
  console.log(`Adding USER.... [usersApi.js]`.yellow);
  const { error } = userSchema.validate(req.body);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({ message });
  }
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).lean();
  if (user) {
    console.log(`Email ${email} is in use [usersApi.js]`.bgRed);
    return res.status(409).json({ message: `Email ${email} is in use` });
  }
  try {
    const user = new UserModel({ email });
    user.setPassword(password);

    await user.save();
    console.log(`Added USER: ${user.email} [usersApi.js]`.bgGreen);
    return res
      .status(201)
      .json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    console.error(`Error add USER: ${error} [usersApi.js]`.bgRed);
    next(error);
  }
});

router.post("/users/login", async (req, res, next) => {
  try {
    console.log(`Login USER.... [usersApi.js]`.yellow);
    const { error } = userSchema.validate(req.body);
    if (error) {
      const message = error.details[0].message;
      return res.status(400).json({ message });
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        message: "Email or password is wrong",
      });
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    user.token = token;
    await user.save();
    res.status(200).json({
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    console.error(`Error login USER: ${error} [usersApi.js]`.bgRed);
    next(error);
  }
});

router.post("/users/logout", auth, async (req, res, next) => {
  try {
    console.log(`Logout USER.... [usersApi.js]`.yellow);
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    user.token = null;
    await user.save();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.get("/users/current", auth, async (req, res, next) => {
  try {
    console.log(`Getting USER.... [usersApi.js]`.yellow);
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
});

export const usersRouter = router;
