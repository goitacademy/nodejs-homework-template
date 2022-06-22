import models from "../../models/index.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { v4 } from "uuid";
import services from "../../services/index.js";

const { userModel } = models;
const { User } = userModel;
const { Conflict } = createError;
const { sendMail } = services;

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const verificationToken = v4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    from: "glasgalas@meta.ua",
    subject: "Registration confirmation",
    html: `<p><a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirmation</a> email</p>`,
  };
  await sendMail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "User successfully registered",
    data: {
      user: {
        email,
        subscription: "starter",
        verificationToken,
      },
    },
  });
};
