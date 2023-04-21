import { token } from "morgan";
import { User } from "../services/schemas/schema.js";
import { validationLogAndPass, validationSubscription } from "../validation.js";
import jwt from "jsonwebtoken";
import * as authServices from "../services/auth.js";

export const singup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = validationLogAndPass.validate({ email, password });
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });

    const isUserExist = await authServices.checkingUserExist(email);
    console.log(isUserExist);
    if (isUserExist)
      return res.status(409).json({
        message: "Email in use",
      });

    const user = await authServices.createUser(email, password);

    res.status(201).json({
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = validationLogAndPass.validate({ email, password });
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });

    const user = await authServices.checkingUserExist(email);
    if (!user)
      return res.status(400).json({
        message: "The user does not exist ",
      });

    const authorization = user.validatePassword(password);
    if (!authorization)
      return res.status(401).json({
        message: "Email or password is wrong ",
      });

    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign({ payload }, process.env.SECRET);

    await authServices.createTokenToUser(email, token);

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await authServices.logoutUser(userId);

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res, next) => {
  try {
    const user = req.user;
    return res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const subscription = req.body.subscription;

    const { error } = validationSubscription.validate({ subscription });
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });

    const updatedUser = await authServices.updateUserSubscription(
      userId,
      subscription
    );

    return res.json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const authorization = async (req, res, next) => {
  try {
    const reqToken = (req.headers.authorization || "").slice(7);
    if (!reqToken) return res.status(401).json({ message: "Not authorized" });

    const verifiedToken = jwt.verify(reqToken, process.env.SECRET);

    const user = await authServices.checkUserById(verifiedToken.payload.id);

    const compareToken = reqToken === user.token;

    if (!user || !compareToken) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
