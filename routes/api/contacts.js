const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");
const { RequestError } = require('../../helpers');
const {
  bodySchema
} = require('../../schemas/contacts');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await getContactById(contactId);

    if (!contactById) {
      throw RequestError(404, "Not found");
    }

    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationResult = bodySchema.validate(req.body)
    const body = req.body;

    if (validationResult.error) {
      throw RequestError(404, "missing required name field");
    }

    const newContact = await addContact(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const findContactById = await removeContact(contactId);

    if (!findContactById) {
      throw RequestError(404, "Not found");
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;
    const currentContact = await getContactById(contactId);

    if (!currentContact) {
      throw RequestError(404, "Contact not found");
    }

    const updatedContact = {
      ...currentContact,
      ...body,
    };

    const contactUpdate = await updateContact(contactId, updatedContact);

    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }

    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
});


module.exports = router;