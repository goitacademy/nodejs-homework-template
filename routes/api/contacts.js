const express = require("express");
const Contacts = require("../../models/contacts.js");
const contactSchema = require("../../schemas/contact.js");

const router = express.Router();

const jsonParser = express.json();

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
    const contact = await Contacts.getById(contactId);

    if (contact !== null) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", jsonParser, async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      const missingFields = error.details.map(
        (detail) => `${detail.context.key}`
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `missing required ${missingFields.join(", ")} field${
            missingFields.length > 1 ? "s" : ""
          }`,
        });
      }
    }

    const newContact = await Contacts.addContact({
      name: value.name,
      email: value.email,
      phone: value.phone,
    });

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.removeContact(contactId);

    if (contact !== null) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", jsonParser, async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error, value } = contactSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { contactId } = req.params;
    const updatedContact = await Contacts.updateContact(contactId, value);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
