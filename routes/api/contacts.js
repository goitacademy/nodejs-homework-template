const express = require("express");

const contactsBook = require("../../models/contacts.js");
const contactsScheme = require("../../schemas/contactsScheme.js");

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const listedContacts = await contactsBook.listContacts();
    res.status(200).json(listedContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const foundContact = await contactsBook.getContactById(id);
    if (foundContact === null) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(foundContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { error, value } = contactsScheme.validate(req.body);

  if (typeof error !== "undefined") {
    res.status(400).json({
      message: `missing required ${error.details[0].context.key} field`,
    });
  }

  try {
    const newContact = {
      name: value.name,
      email: value.email,
      phone: value.phone,
    };
    const addNewContact = await contactsBook.addContact(newContact);

    res.status(201).json(addNewContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const deleteContact = await contactsBook.removeContact(id);
    if (deleteContact === null) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const id = req.params.contactId;
  const { error, value } = contactsScheme.validate(req.body);

  if (typeof error !== "undefined") {
    res.status(400).json({
      message: `missing required ${error.details[0].context.key} field`,
    });
    return;
  }

  try {
    const updateContact = await contactsBook.updateContact(id, value);
    if (!updateContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "contact updated" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
