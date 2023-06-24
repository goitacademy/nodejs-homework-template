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

const contactValidation = Joi.defaults(() =>
  Joi.object({
    name: Joi.string().pattern(
      /^([A-ZĄĆĘŁŃÓŚŹŻ]+'?[a-ząćęłńóśźż]+|[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+'?[a-ząćęłńóśźż]+) ([A-ZĄĆĘŁŃÓŚŹŻ]+'?[a-ząćęłńóśźż]+|[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+'?[a-ząćęłńóśźż]+)$/
    ),
    email: Joi.string().email(),
    phone: Joi.string().pattern(
      /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
    ),
  })
);

const schemaRequired = contactValidation
  .object()
  .options({ presence: "required" })
  .required();

router.get("/", async (req, res, next) => {
  try {
    const contactList = await listContacts();
    res.status(200).json(contactList);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      return res.status(200).json(contact);
    } else {
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = await req.body;
    const validation = schemaRequired.validate({ name, email, phone });
    if (validation.error) {
      res.status(400).json({
        message: validation.error.details[0].message,
        code: 400,
      });
      return;
    }
    const contact = await addContact({ name, email, phone });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactRemoved = await removeContact(contactId);
    if (contactRemoved) {
      res.json({
        status: "success",
        code: 200,
      });
    } else {
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const validation = schema.validate({ name, email, phone });
    if (validation.error) {
      res.status(400).json({
        message: validation.error.details[0].message,
        code: 400,
      });
      return;
    }
    const isContact = await updateContact(
      contactId,
      JSON.parse(JSON.stringify(validation.value))
    );
    if (isContact) {
      res.json({
        status: "success",
        code: 200,
        data: { ...isContact },
      });
      return;
    }
    res.status(404).json({
      message: "Not found",
      code: 404,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
