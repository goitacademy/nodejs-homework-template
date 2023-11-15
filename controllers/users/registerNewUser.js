import User from "#models/userModel.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import gravatar from "gravatar";

const registerNewUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export async function registerNewUser(req, res) {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: "250", d: "retro", r: "g" });

  const { error } = registerNewUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({ email, password: hashedPassword, avatarURL });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
