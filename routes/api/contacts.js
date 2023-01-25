const express = require('express');
const { HttpError } = require("../../helpers/index");
const {validationSchema, updateFavoriteSchema} = require("../../schemas/contact")
const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../../models/contacts");
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data });
  } catch (err) {
    HttpError(404, "Not found")
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    if (contactId.length !==  24) {
      return next(HttpError(404, "wrong ID"));
    }
    const data = await getContactById(contactId);
    console.log(data);
    if (!data) {
      return next(HttpError(404, "Not found"));
    }
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "missing fields"));
    }
    const data = await addContact(req.body);
    const message = "User added successfully!";
    res.status(201).json({ message, data });
  } catch (err) {
    next(err);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (contactId.length !==  24) {
      return next(HttpError(404, "wrong ID"));
    }
    const data = await getContactById(contactId);
    console.log("data", data);
    if (!data) {
      return next(HttpError(404, "Not found"));
    }
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "missing field name"));
    }

    const contactId = req.params.contactId;
    const message = "User updated successfully!";

    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      return next(HttpError(404, "Not found"));
    }
    res.status(200).json({ message, updatedContact });
  } catch (err) {
    
  };
  
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "missing field favorite"));
    }

    const contactId = req.params.contactId;
    const message = "Favorite status updated successfully!";

    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      return next(HttpError(404, "Not found"));
    }
    res.status(200).json({message, updatedContact });
  } catch (err) {
    
  };
  
})

module.exports = router
