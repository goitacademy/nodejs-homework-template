const express = require("express");
const contactService = require("../../models/contacts");
const router = express.Router();
const createError = require("../../untils/createError");
const ERROR_TYPES = require("../../constants/errorTypes");
const uptadeContactsSchema = require('../../untils/updateContacatSchema')
const handlerError = require("../../middlewears/handlerError");
const schemaAddContact = require("../../untils/addContactSchema");
router.get("/", async (req, res, next) => {
  try {
    const data = await contactService.listContacts();
    res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);

    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error, value } = schemaAddContact.validate(body);
    if (error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "missing required name field",
        data: {},
      });
      throw error;
    }
    const contact = await contactService.addContact(value);
    res.status(201).json({
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactService.removeContact(contactId);
    res.status(200).json({
      message: deleteContact,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const { error, value } = uptadeContactsSchema.validate(body);
    if (error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "missing fields",
        data: {},
      });
      throw error;
    }
    const updateContact = await contactService.updateContact(contactId, value);

    res.status(200).json({
      data: updateContact,
      message: "you pidor",
    });
  } catch (error) {
    next(error);
  }
});
router.use(handlerError);

module.exports = router;
