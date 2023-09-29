const express = require("express");
const contactsService = require("../../models/index");
const { HttpError } = require("../../helpers/HttpErrors");

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    if (!contact) {
      throw HttpError(404, `Contact with ${id} is not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const newContact = await contactsService.addContact(body);
    res.status(201).json(newContact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

contactsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await contactsService.removeContact(id);

    res.status(204).json(deletedContact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

contactsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedContacts = await contactsService.updateContact(id, body);
    res.status(200).json(updatedContacts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = contactsRouter;
