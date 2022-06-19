import models from "../../models/index.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

const { userModel } = models;
const { User } = userModel;
const { Conflict } = createError;

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({ email, password: hashPassword, avatarURL });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "User successfully registered",
    data: {
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};
