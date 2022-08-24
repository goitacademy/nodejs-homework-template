const express = require('express')
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schema");
const contactsOperations = require("../../models/contacts");

const router = express.Router()

router.get('/', async (req, res, next) => {
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

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        status: "ERROR",
        code: 404,
        message: `Contact with ID=${contactId} not found`,
      });
      return;
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

router.post('/', validation(contactSchema), async (req, res, next) => {
  try {
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact added",
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsOperations.removeContact(contactId);
    if (!removedContact) {
      res.status(404).json({
        status: "ERROR",
        code: 404,
        message: `Conatct with ID=${contactId} not found`,
      });
      return;
    }
    res.json({
      status: "Success",
      code: 200,
      message: "Contact delete",
      data: {
        result: removedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', validation(contactSchema), async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await contactsOperations.updateContact(
      contactId,
      req.body
    );
    if (!updateContact) {
      res.status(404).json({
        status: "ERROR",
        code: 404,
        message: `Contact with ID=${contactId} not found`,
      });
      return
    }
    res.json({
      status: "Success",
      code: 200,
      message: "Contact updated",
      data: {
        result: updateContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
