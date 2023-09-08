import { Router } from "express";
import { getContactHandler } from "./contacts.controller.js";
import {
  addContact,
  deleteContact,
  getAllContact,
  getContact,
  patchContact,
} from "./contacts.dao.js";

const contactsRouter = Router();

contactsRouter.get("/", async (_, res) => {
  const contacts = await getAllContact();
  return res.json({ contacts });
});

contactsRouter.get("./:id", getContactHandler);

contactsRouter.post(
  "/",
  (req, res, next) => {
    const contactToCreate = req.body;
    if (contactToCreate.email === undefined) {
      return res.status(404).send({ error: "Email is required " });
    }
    next();
  },
  async (req, res) => {
    const contactToCreate = req.body;
    const createdContact = await addContact(contactToCreate);

    return res.status(201).json({ contact: createdContact });
  }
);
contactsRouter.patch("/:id", async (req, res) => {
  const contactId = req.params.body;
  const contactToPatch = req.body;

  const patchedContact = await patchContact(contactId, contactToPatch);

  return res.status(201).send({ user: patchedContact });
});

contactsRouter.delete("/:id", async (req, res) => {
  const contactId = req.params.body;
  await deleteContact(contactId);
  return res.status(204).send();
});

export { contactsRouter };
