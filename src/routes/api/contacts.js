const express = require("express");
const {
  addPostValidation,
  patchValidation,
} = require("../../middlewares/validationSchema");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  putContact,
} = require("../../models/contacts");

// router.get("/", listContacts);
router.get("/", async (req, res, next) => {
  const contact = await listContacts();
  // console.log('contact', contact)
  res.json(contact);
});

// router.get("/:contactId", getContactById);
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  res.json(contactById);
});

// router.post("/", addPostValidation, addContact);
router.post("/", addPostValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  await addContact(name, email, phone);
  res.json({ status: "success" });
});

// router.delete("/:contactId", removeContact);
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.json({ status: "success" });
});

router.put("/:contactId", addPostValidation, putContact);

router.patch("/:contactId", patchValidation, updateContact);

module.exports = router;

// const express = require('express')

// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router
