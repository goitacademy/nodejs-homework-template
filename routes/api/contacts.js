const express = require('express');
const router = express.Router();


const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContact,
} = require("./../../models/contacts");



router.get('/', async (req, res, next) => {
   try {
    const contacts = await listContacts();
    res.status(200).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: 'success',
      message: 'Contacts fetched successfully',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
});


router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "error",
        message: "Not found",
      });
    }
    res.status(200).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: "success",
      message: "Contact fetched successfully",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    if (error) {
      return res.status(400).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "error",
        message: "missing required name - field",
      });
    }
    const newContact = await addContact(name, email, phone);
    res.status(201).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: "success",
      message: "Contact added successfully",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
   try {
     const contactId = req.params.contactId;
     const removedContact = await removeContact(contactId);
     if (!removedContact) {
       return res.status(404).json({
         method: req.method,
         endpoint: req.originalUrl,
         status: "error",
         message: "Not found",
       });
     }
     res.status(200).json({
       method: req.method,
       endpoint: req.originalUrl,
       status: "success",
       message: "Contact removed successfully",
       data: removedContact,
     });
   } catch (error) {
     next(error);
   }
})

router.put('/:contactId', async (req, res, next) => {
    try {
      const contactId = req.params.contactId;
      if (error) {
        return res.status(400).json({
          method: req.method,
          endpoint: req.originalUrl,
          status: "error",
          message: "Missing fields",
        });
      }
      const updatedContact = await updateContact(contactId, value);
      if (!updatedContact) {
        return res.status(404).json({
          method: req.method,
          endpoint: req.originalUrl,
          status: "error",
          message: "Contact not found",
        });
      }
      res.status(200).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "success",
        message: "Contact updated successfully",
        data: updatedContact,
      });
    } catch (error) {
      next(error);
    }
})

module.exports = router;
