const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getContact = await getContactById(contactId);
    if (!getContact) {
      return res.status(404).json({
        message: `Contact with id "${contactId}" not found`,
        status: 404,
      });
    }
    res.status(200).json({
      status: 200,
      data: { getContact },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const newContact = await addContact(req.body);
    res.status(201).json({ data: { newContact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId);
    if (!deleteContact) {
      return res.status(404).json({
        message: "Contact not found",
        status: 404,
      });
    }
    res.status(200).json({
      message: "Contact deleted",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { contactId } = req.params;
    const updateOldContact = await updateContact(contactId, req.body);
    if (!updateOldContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ data: { updateOldContact } });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { favorite } = req.body;
    if (typeof favorite !== "boolean") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const { contactId } = req.params;
    const setFavorite = await updateFavorite(contactId, favorite);
    if (!setFavorite) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ data: { setFavorite } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
