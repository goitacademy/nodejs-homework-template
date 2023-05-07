const express = require("express");
const contactsOperations = require("../../models/contacts");
const HttpError = require("../../helpers");
const {validation} = require('../../middlewares');
const {contactSchema} = require('../../schemas')

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "Success",
      code: 200,
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
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }
    res.json({
      status: "Success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", validation(contactSchema), async (req, res, next) => {
  try {
    const contact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        result: contact,
      },
    })
  } catch (error) {
    next (error)
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
