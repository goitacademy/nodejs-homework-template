const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { schema } = require("../../helpers/validationSchema");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const router = express.Router();

router.get(
  "/",
  ctrlWrapper(async (req, res) => {
    const contacts = await listContacts();

    res.json({
      message: "All contacts",
      contacts,
    });
  })
);

router.get(
  "/:contactId",
  ctrlWrapper(async (req, res) => {
    const foundContact = await getContactById(req.params.contactId);

    if (!foundContact) return res.status(400).json({ message: "Not found" });

    res.json({
      message: "Found contact by the following id",
      foundContact,
    });
  })
);

router.post(
  "/",
  ctrlWrapper(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing required fields" });
    }

    const values = await schema.validateAsync({ name, email, phone });

    const newContact = await addContact(values);

    res.json({
      message: "Contact added",
      newContact,
    });
  })
);

router.delete(
  "/:contactId",
  ctrlWrapper(async (req, res) => {
    const contactToDelete = await removeContact(req.params.contactId);

    if (!contactToDelete) return res.status(404).json({ message: "Not found" });

    res.json({
      message: "contact deleted",
      contactToDelete,
    });
  })
);

router.put(
  "/:contactId",
  ctrlWrapper(async (req, res) => {
    const { name, phone, email } = req.body;
    const id = req.params.contactId;
    const values = await schema.validateAsync({ name, email, phone });

    const updatedContact = await updateContact(id, values);

    if (!updateContact) return res.status(404).json({ message: "Not found" });

    res.json({
      message: "contact updated",
      updatedContact,
    });
  })
);

module.exports = router;
