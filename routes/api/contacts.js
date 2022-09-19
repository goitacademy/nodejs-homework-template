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

router.get("/", async (req, res) => {
  try {
    const contactList = await listContacts();
    res.json({
      contacts: contactList,
      message: "successful",
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
      name: Joi.string().alphanum().min(3).max(30).trim().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .trim()
        .required(),
      phone: Joi.string()
        .length(7)
        .pattern(/^[0-9]+$/)
        .trim()
        .required(),
    });
    console.log("req.body :>> ", req.body);

    const validationResult = schema.validate(req.body);
    console.log("validationResult :>> ", validationResult);
    if (validationResult.error) {
      res.status(400).json({ message: "missing required name field" });
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
    const { body } = req;

    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).trim(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .trim(),
      phone: Joi.string()
        .length(7)
        .pattern(/^[0-9]+$/)
        .trim(),
    });

    const validationResult = body ? schema.validate(body) : false;
    if (validationResult.error) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const updatedContact = await updateContact(contactId, body);

    res.json({
      message: `Update completed successfully`,
      status: 200,
      contact: updatedContact,
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
