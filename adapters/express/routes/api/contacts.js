const express = require("express");
const contactService = require("../../../../contacts/contacts");
const router = express.Router();
const createError = require("../../../../untils/createError");
const ERROR_TYPES = require("../../contastants/errorTypes");
const uptadeContactsSchema = require('../../../../untils/updateContacatSchema')
const handlerError = require("../../../../middlewears/handlerError");
const schemaAddContact = require("../../../../untils/addContactSchema");
router.get("/", async (req, res, next) => {
  try {
    const results = await contactService.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        results
      },
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
    const contact = await contactService.addContact(body);
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
    const updateContact = await contactService.updateContact(contactId, body);
    res.status(200).json({
      data: updateContact,
    });
  } catch (error) {
    next(error);
  }
});
router.use(handlerError);

module.exports = router;
