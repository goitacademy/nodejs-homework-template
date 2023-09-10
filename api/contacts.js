import express from "express";
import {
  get,
  getById,
  add,
  update,
  updateStatus,
  remove,
} from "../controller/contacts.js";
import { auth } from "../controller/users.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, get);

contactsRouter.get("/:id", auth, getById);

contactsRouter.post("/", auth, add);

contactsRouter.put("/:id", auth, update);

contactsRouter.patch("/:id/favorite", auth, updateStatus);

contactsRouter.delete("/:id", auth, remove);

export default contactsRouter;
