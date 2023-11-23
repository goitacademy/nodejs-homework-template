const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { schema } = require("../../helpers/validationSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({
      message: "All contacts",
      contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const foundContact = await getContactById(req.params.contactId);

    if (!foundContact) {
      return res.status(400).json({ message: "Not found" });
    }

    res.json({
      message: "Found contact by the following id",
      foundContact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactToDelete = await removeContact(req.params.contactId);

    if (!contactToDelete) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      message: "contact deleted",
      contactToDelete,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    const id = req.params.contactId;
    const values = await schema.validateAsync({ name, email, phone });

    const updatedContact = await updateContact(id, values);

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      message: "contact updated",
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
