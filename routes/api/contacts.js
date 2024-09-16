const express = require("express");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = new express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    const data = await listContacts();
    res.json({ data });
  })
  .post(addContactValidation, async (req, res, next) => {
    const { name, email, phone } = req.body;
    const newContact = {
      id: new Date().getTime().toString(),
      name,
      email,
      phone,
    };
    await addContact(newContact);
    res.status(201).json(newContact);
  });

router
  .route("/:contactId")
  .get(async (req, res, next) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ data });
  })
  .delete(async (req, res, next) => {
    const { contactId } = req.params;
    const list = await listContacts();
    if (!list.find((it) => it.id === contactId)) {
      return res.status(404).json({ message: "Not found" });
    }
    await removeContact(contactId);
    res.json({ message: "contact deleted" });
  })
  .put(putContactValidation, async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const list = await listContacts();
      if (!list.find((it) => it.id === contactId)) {
        return res.status(404).json({ message: "Not found" });
      }
      await updateContact(contactId, req.body);
      const data = await getContactById(contactId);
      res.json({ data });
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  });

module.exports = router;
