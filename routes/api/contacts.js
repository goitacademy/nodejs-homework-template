import express from "express";
import contactsService from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  res.json(result);
});

contactsRouter.post("/", async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  res.json(result);
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  res.json(result);
});

export default contactsRouter;
