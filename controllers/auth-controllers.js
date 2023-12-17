import { controllerWrapper } from "../decorators/controllerWrapper.js";
import authServices from "../services/auth-services.js";

const signUp = controllerWrapper(async (req, res) => {
  const newUser = await authServices.signUpService(req.body);
  res.status(201).json(newUser);
});

const logIn = controllerWrapper(async (req, res) => {
  const token = await authServices.logInService(req.body);
  res.json(token);
});

const getCurrent = async (req, res) => {
  const { password, email } = req.user;

  res.json({
    password,
    email,
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204);
};

export default {
  signUp,
  logIn,
  getCurrent,
  signOut,
};
