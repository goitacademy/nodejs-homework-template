import express from "express";
import { getContactById, listContacts } from "../../models/contacts.js";
import { addContactSchema } from "../../schemas/contacts.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    res.json(result);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

contactsRouter.post("/", async (req, res, next) => {
  console.log("body", req.body);
  // const { error } = addContactSchema.validate(req.body);
  // console.log(error);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});
