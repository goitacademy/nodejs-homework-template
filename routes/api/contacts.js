const express = require("express");
const Joi = require("joi");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(25).required(),
  favorite: Joi.boolean(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: "succes", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({ status: "succes", code: 200, data: { contact } });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Problem with validation",
        errorDetails: error.details,
      });
    }

    const addedContact = await addContact(body);

    res.status(201).json({
      status: "succes",
      code: 201,
      data: {
        contact: addedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    if (contact) {
      await removeContact(contactId);
      res.json({
        status: "succes",
        code: 200,
        message: "Contact deleted",
        deletedContact: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { body } = req;
    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Problem with validation",
        errorDetails: error.details,
      });
    }

    const contact = await getContactById(contactId);

    if (contact) {
      const updatedContact = await updateContact(contactId, body);
      res.json({
        status: "succes",
        code: 200,
        updateData: {
          contact: updatedContact,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field favorite",
      });
    }

    const updatedContact = await updateFavorite(contactId, favorite);

    if (updatedContact) {
      res.json({
        status: "succes",
        code: 200,
        updatedData: {
          contact: updatedContact,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
