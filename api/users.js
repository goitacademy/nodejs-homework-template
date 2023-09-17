import express from "express";
import {
  list,
  login,
  signup,
  auth,
  logout,
  update,
  updateUserAvatar,
} from "../controller/users.js";
import { get as getContacts } from "../controller/contacts.js";
import multer from "multer";
import { uploadImage } from "../config/config-multer.js";

const avatarUpload = multer({ dest: "tmp/" });

const usersRouter = express.Router();

usersRouter.post("/login", login);

usersRouter.post("/signup", signup);

usersRouter.post("/logout", auth, logout);

usersRouter.get("/list", auth, list);

usersRouter.get("/current", auth, getContacts);

usersRouter.patch("/:userId/subscription", update);

usersRouter.patch("/avatars", uploadImage, updateUserAvatar);

export default usersRouter;
