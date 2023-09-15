import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const { SECRET_KEY } = process.env;
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.token) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const accessToken = Jwt.sign(payload, SECRET_KEY, { expiresIn: "30m" });
  const refreshToken = Jwt.sign(payload, SECRET_KEY, { expiresIn: "10d" });
  await User.findByIdAndUpdate(id, {accessToken, refreshToken})
  res.json({ accessToken, refreshToken });
};

const getCurrent = (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Signout success" });
};

const refresh = async (req, res) => {
    const {refreshToken} = req.body;
    try{
        const {id} = jwt.verify(refreshToken, SECRET_KEY)
        const user = await User.findByIdAndUpdate({refreshToken});
        if(!user) {
            throw HttpError(403)
        }
        const accessToken = Jwt.sign(payload, SECRET_KEY, { expiresIn: "30m" });
  const refreshToken = Jwt.sign(payload, SECRET_KEY, { expiresIn: "10d" });
  await User.findByIdAndUpdate(id, {accessToken, refreshToken})
  res.json({ accessToken, refreshToken }) }
    catch (error){throw error}
    
    res.json({ message: "Signout success" });
  };

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
