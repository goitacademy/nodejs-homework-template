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
import { uploadImage } from "../config/config-multer.js";

const usersRouter = express.Router();

usersRouter.post("/login", login);

usersRouter.post("/signup", signup);

usersRouter.post("/logout", auth, logout);

usersRouter.get("/list", auth, list);

usersRouter.get("/current", auth, getContacts);

usersRouter.patch("/:userId/subscription", update);

usersRouter.patch("/avatars", auth, uploadImage, updateUserAvatar);

export default usersRouter;
