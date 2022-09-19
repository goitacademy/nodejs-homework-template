const express = require("express");
const router = express.Router();
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (_, res) => {
  try {
    const contactList = await listContacts();
    res.json({
      contacts: contactList,
      message: "success",
      status: 200,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const targetedContact = await getContactById(contactId);
    res.json({
      contact: targetedContact || {},
      message: targetedContact ? "success" : "Not found",
      status: targetedContact ? 200 : 404,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^([a-zA-Z]{2,}\s?[a-zA-Z]{1,})/)
        .min(3)
        .max(30)
        .trim()
        .required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .trim()
        .required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .trim()
        .required(),
    });

    if (!(name && email && phone)) {
      res
        .status(400)
        .json({ message: "fields 'name', 'email' and 'phone' are required " });
      return;
    }

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      res.status(400).json({
        message:
          "fields that you try to change do not meet the validation requirements",
      });
      return;
    }
    console.log("req.body :>> ", req.body);

    const addedContact = await addContact({ name, email, phone });
    res.json({
      message: "success",
      status: 201,
      contact: addedContact,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const isRemovalSuccessful = await removeContact(contactId);
    res.json({
      message: isRemovalSuccessful ? "contact deleted" : "Not found",
      status: isRemovalSuccessful ? 200 : 404,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^([a-zA-Z]{2,}\s?[a-zA-Z]{1,})/)
        .min(3)
        .max(30)
        .trim(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .trim(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .trim(),
    });

    console.log("name :>> ", name);
    console.log("email :>> ", email);
    console.log("phone :>> ", phone);

    if (!(name ?? email ?? phone)) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      res.status(400).json({
        message:
          "fields that you try to change do not meet the validation requirements",
      });
      return;
    }
    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json({
      message: `contact ${contactId} was successfully updated`,
      contact: updatedContact,
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
