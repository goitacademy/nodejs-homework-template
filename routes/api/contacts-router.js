import express from "express";

import movieService from "../../models/contacts/index.js";

import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const result = await movieService.listContacts();
  res.json(result);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const result = await movieService.getContactById();
  res.json({ result });
});

contactsRouter.post("/", async (req, res, next) => {
  const result = await movieService.addContact();
  res.json({ result });
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const result = await movieService.removeContact();
  res.json({ result });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const result = await movieService.updateContact();
  res.json({ result });
});

export default contactsRouter;
