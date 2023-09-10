import express from "express";
import {
  get,
  list,
  login,
  signup,
  auth,
  logout,
  update,
} from "../controller/users.js";
import { get as getContacts } from "../controller/contacts.js";

const usersRouter = express.Router();

usersRouter.get("/test", get);

usersRouter.post("/login", login);

usersRouter.post("/signup", signup);

usersRouter.post("/logout", auth, logout);

usersRouter.get("/list", auth, list);

usersRouter.get("/current", auth, getContacts);

usersRouter.patch("/:userId/subscription", update);

export default usersRouter;
