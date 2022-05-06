const express = require('express');
const router = express.Router();
const { Contact } = require('../../models/contacts');

const {
  validateAddedContact,
  // validateUpdatedContact,
} = require('../../middlewares/validation');

router.get('/', async (req, res) => {
  const contactsList = await Contact.find();
  if (!contactsList) {
    res.status(500).json({ success: false });
  }
  res.send(contactsList);
});

// router.get('/:contactId', getContactById);

router.post('/', validateAddedContact, async (req, res) => {
  let contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite
  })
  contact = await contact.save();

  if (!contact)
    return res.status(400).send('the contact cannot be created!')

  res.send(contact);
});

// router.delete('/:contactId', removeContact);

// router.put('/:contactId', validateUpdatedContact, updateContact);

module.exports = router;
