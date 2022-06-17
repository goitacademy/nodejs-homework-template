import models from "../../models/index.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { userModel } = models;
const { User } = userModel;
const { Unauthorized } = createError;
const { SECRET_KEY } = process.env;

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const userName = (mail) => {
    const indx = mail.indexOf("@");
    const name = mail.slice(0, indx);
    return name;
  };

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).send({
    status: "success",
    code: 200,
    message: `Welcome, ${userName(email)}!`,
    data: {
      token,
    },
  });
};
