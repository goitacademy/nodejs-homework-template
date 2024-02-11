const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const validate = require("./../../validator/validator");


const contactsRouter = express.Router();

contactsRouter.get("/contacts", async (__, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

contactsRouter.get("/contacts/:Id", async (req, res) => {
  const { Id } = req.params;
  const contact = await getContactById(Id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: `Not found` });
  }
});

contactsRouter.post("/contacts",validate.contactValid, async (req, res) => {
  const newContact = await addContact(req.body);
  res.json({ status: "success", code: 201, data: { newContact } });
});

contactsRouter.delete("/contacts/:Id", async (req, res) => {
  const { Id } = req.params;
  const contact = await removeContact(Id);
  if (contact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

contactsRouter.put("/contacts/:Id",validate.contactValid, async (req, res) => {
  const { Id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      code: 400,
      message: "missing fields",
    });
    return;
  }

  if (req.body) {
    const contactToEdit = await updateContact(Id, req.body);
    res.json({
      status: "success",
      code: 200,
      data: {
        contactToEdit,
      },
      message: "Contact has been updated successfully",
    });
  } else {
    res.json({
      code: 404,
      message: "Not found",
    });
  }
});

module.exports = contactsRouter;
