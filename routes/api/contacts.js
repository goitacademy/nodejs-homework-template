import express from "express";
import { listContacts, getContactById, removeContact, addContact, updateContact } from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res) => {
  console.log(req.params);
  const contact = await getContactById(req.params.contactId);
  res.json(contact);
});

router.post("/", async (req, res) => {
  if (req.body.name && req.body.email && req.body.phone) {
    const addedContact = await addContact(req.body);
    res.json(addedContact).status(201).end();
  } else {
    res.status(400).json({ message: "not valid body" });
  }
});

router.delete("/:contactId", async (req, res) => {
  const deletedContact = await removeContact(req.params.contactId);
  res.json(deletedContact).status(204).end();
});

router.put("/:contactId", async (req, res, next) => {
  const { params, body } = req;
  const isBodyEmpty = Object.keys(body).length === 0 ? true : false;

  if (!isBodyEmpty && params.contactId) {
    const updatedContact = await updateContact(params.contactId, body);
    
    updatedContact ?
      res.json(updatedContact).status(201).end() :
      res.status(400).json({ message: "id not found" });
  } else {
    res.status(400).json({ message: "body was not sent" });
  }
});

export default router;
