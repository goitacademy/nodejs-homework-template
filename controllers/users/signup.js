// controllers/users/signup.js
import Joi from "joi";
import User from "#models/users.js";
import bcrypt from "bcrypt";

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

async function signup(req, res) {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      subscription: "starter",
    });

    await newUser.save();

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `An error occurred: ${err.message}` });
  }
}

export { signup };
