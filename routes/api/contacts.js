const express = require("express");

const {

  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

const {
  validateAddedContact,
  validateUpdatedContact,
} = require('../../middlewares/validation');

const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', validateAddedContact, addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validateUpdatedContact, updateContact)


router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const delContact = await removeContact(id);
  console.log('delContact', delContact)
  if (!delContact.length) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Contact deleted" });
});

router.put("/:contactId", validatePatch, updateContact);

module.exports = router;
