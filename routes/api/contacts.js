const express = require('express')

const router = express.Router()

let contacts = [
  {
    id: "1",
    name: "Allen Raymond",
    email: "nulla.ante@vestibul.co.uk",
    phone: "(992) 914-3792"
  },
  {
    id: "2",
    name: "Chaim Lewis",
    email: "dui.in@egetlacus.ca",
    phone: "(294) 840-6685"
  },
];

// GET /api/contacts => [...contacts]
router.get('/', async (req, res, next) => {
  res.json({contacts, status: 'success'})
})

// GET /api/contacts/123 => {post with id 123}
router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const [contact] = contacts.filter(contact => contact.id === contactId)

  if (!contact) {
    return res.status(400).json({status: `failure, no contact with id '${contactId}' found!`})
  }

  res.json({ contact, status: 'success' })
});

// POST /api/contacts => [newContact, ...contacts]
router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  contacts.push({
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  });

  res.json({ status: 'success' });
})

// DELETE /api/contacts/123 => [contacts without contact with id 123]
router.delete('/:contactId', async (req, res, next) => {
  contacts = contacts.filter(contact => contact.id !== req.params.contactId)
  res.json({ status: 'success' });
})

// PUT /api/contacts/123 => [changedContact, ...contacts]
router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body;

  contacts.forEach(contact => {
    if (contact.id === req.params.contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });

  res.json({ status: 'success' });
})

module.exports = router
