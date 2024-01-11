const express = require('express')
const router = express.Router()
// const { schemaAdd, schemaUpdate } = require("../../validator/validator");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ message: contacts });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
});


router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await getContactById(contactId);

    if (response !== null) {
      res.status(200).json({ message: response });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
