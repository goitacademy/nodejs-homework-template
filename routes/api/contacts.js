const express = require("express");

const router = express.Router();

const Contacts = require("../../models/contacts");
const addSchema = require("../../schemas/addSchema");
const putSchema = require("../../schemas/putSchema");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.getContactById(contactId);

    if (contact !== null) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = addSchema.validate(req.body, { abortEarly: false });
    const body = req.body;
    const newContact = await Contacts.addContact(body);
    if (typeof response.error !== "undefined") {
      return res
        .status(400)
        .send(response.error.details.map((err) => err.message).join(", "));
    }
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contacts.removeContact(contactId);

    if (deletedContact !== null) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const { error } = putSchema.validate(body, { abortEarly: false });

    console.log(error);

    const updatedContact = await Contacts.updateContact(contactId, body);

    if (error) {
      return res.status(400).send({ message: "missing fields" });
    }

    if (updatedContact !== null) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
