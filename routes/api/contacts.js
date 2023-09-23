const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../services/contacts.service");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ status: "Success", code: 200, contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res
      .status(404)
      .json({ status: "Not Found", code: 404, message: "Contact not found" });
  } else {
    res.status(200).json({
      status: "Success",
      code: 200,
      message: `Contact with id: ${req.params.contactId} found`,
      contact,
    });
  }
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const validatedContact = schema.validate(req.body);

  if (validatedContact.error) {
    res.status(400).json({
      status: "Bad request",
      code: 400,
      message: "Missing required field",
    });
    return;
  } else {
    const newContact = await addContact(req.body);
    if (newContact) {
      res.status(201).json({
        status: "Created",
        code: 201,
        message: "Success! New contact added",
        newContact,
      });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const filteredList = await removeContact(req.params.contactId);
  if (filteredList) {
    res.status(204).json({
      status: "No Content",
      code: "204",
      message: "Contact successfully deleted",
      filteredList,
    });
  } else {
    res
      .status(404)
      .json({ status: "Not found", code: 404, message: "Contact not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const validatedContact = schema.validate(req.body);
  if (validatedContact.error) {
    res
      .status(400)
      .json({ status: "Bad request", code: 400, message: "missing fields" });
  } else {
    try {
      const updatedList = await updateContact(contactId, req.body);
      res.status(200).json({ status: "OK", code: "200", updatedList });
    } catch (error) {
      console.error(error.message);
      res
        .status(404)
        .json({ status: "Not found", code: 404, message: "Not found" });
    }
  }
});

module.exports = router;
