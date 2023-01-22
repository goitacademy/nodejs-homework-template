const express = require("express")

const router = express.Router();

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("../../models/contacts");

const { schema } = require("../../utils/validation/schema");

router.get('/', async (req, res, next) => {
  try {
    const contacts = await getContacts();
    res.status(200).json({ contacts })
  } catch (error) {
    next(error);
  };
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({message:"Not found"})
    }
    res.status(200).json({contact})
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "validation error" });
    }
    const contact = await addContact(req.body);
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  };
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deleteContact = await getContacts().then((contacts) =>
      contacts.find((contact) => contact.id === req.params.contactId.toString()));
    if (!deleteContact) {
      res.status(404).json({ message: "Not found" });
      return null;
    };
    await removeContact(req.params.contactId);
    res.status(200).json({message:"Contact has been deleted"})
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error){
      res.status(400).json({message:"validation error"})
    };
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error)
  }
})

module.exports = router
