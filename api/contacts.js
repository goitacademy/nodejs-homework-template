import express from "express";
import {
  get,
  getById,
  add,
  update,
  updateStatus,
  remove,
} from "../controller/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", get);

contactsRouter.get("/:id", getById);

contactsRouter.post("/", add);

contactsRouter.put("/:id", update);

contactsRouter.patch("/:id/favorite", updateStatus);

contactsRouter.delete("/:id", remove);

export default contactsRouter;
