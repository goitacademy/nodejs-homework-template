const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../service/contactsService");
const {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} = require("../../validation/Joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const contacts = await listContacts(ownerId);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const ownerId = req.user._id;
    const contactToFind = await getContactById(contactId, ownerId);
    if (contactToFind) {
      res.status(200).json(contactToFind);
    } else {
      res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const ownerId = req.user._id;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required field(s)" });
    }

    const dataToAdd = addContactSchema.validate({ name, email, phone });
    if (dataToAdd.error) {
      return res
        .status(400)
        .json({ message: dataToAdd.error.details[0].message });
    }
    const newContact = await addContact(
      { name, email, phone, favorite },
      ownerId
    );
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const ownerId = req.user._id;
    const contactToRemove = await removeContact(contactId, ownerId);
    if (contactToRemove) {
      res.status(200).json({ message: `contact with id ${contactId} deleted` });
    } else {
      res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    if (!body) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const dataToUpdate = updateContactSchema.validate(body);
    if (dataToUpdate.error) {
      return res
        .status(400)
        .json({ message: dataToUpdate.error.details[0].message });
    } else {
      const ownerId = req.user._id;
      const updatedContact = await updateContact(contactId, body, ownerId);

      if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined || favorite === null) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const dataToUpdate = updateContactStatusSchema.validate({ favorite });
    if (dataToUpdate.error) {
      return res
        .status(400)
        .json({ message: dataToUpdate.error.details[0].message });
    } else {
      const ownerId = req.user._id;
      const updatedContact = await updateStatusContact(
        contactId,
        { favorite },
        ownerId
      );

      if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
