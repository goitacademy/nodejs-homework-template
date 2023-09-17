import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
import User from "../models/users.model";

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const signUpHandler = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).json({ message: "Email in use!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription || "starter",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: " Email or password is wrong" });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;

    await user.save();

    return res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription || "starter",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const logoutHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const currentHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
