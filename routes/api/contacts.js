const express = require('express')
const router = express.Router();
const ctrlWrapper = require("../../help/ctrlWrapper");
const {  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateContacStatus,
  deleteContact,
} = require("../../controllers/contacts")
const { validate } = require("../../middlewears/validate");
const { nySchema, statusSchema } = require("../../models/contacts");
const auth = require("../../middlewears/authMiddl")

router.use(auth)

router.get('/', ctrlWrapper(getAllContacts))

router.get("/:contactId", ctrlWrapper(getContactById));

router.post('/',  validate(nySchema), ctrlWrapper(createContact))

router.delete('/:contactId',  ctrlWrapper(deleteContact))

router.put('/:contactId',validate(nySchema), ctrlWrapper(updateContact))

router.patch(
  "/:contactId/favorite",
  validate(statusSchema),
  ctrlWrapper(updateContacStatus)
);

module.exports = router
