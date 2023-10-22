const express = require('express')

<<<<<<< Updated upstream
const router = express.Router()
=======
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../contacts/contacts.functions");
>>>>>>> Stashed changes

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

<<<<<<< Updated upstream
module.exports = router
=======
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    removeContact(id);
    return res.status(200).json({ message: "contact deleted" });
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = contactValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
  }
  const contact = await updateContact(contactId, req.body);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { favorite } = req.body;
    const { contactId } = req.params;
    if (!favorite && favorite !== false) {
      res.status(400).json({ message: "missing field favorite" });
    }
    const contact = await updateStatusContact(contactId, favorite);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
>>>>>>> Stashed changes
