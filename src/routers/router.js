const express = require("express");
const router = express.Router();
const {
  getAll,
  getContactById,
  addNewContact,
  deleteContact,
  updateCurrentContact,
} = require("../controllers/contact.controller");
const { validateContact } = require("../middleware/validateContact");
const { contactsSchema } = require("../schema/contactsSchema");
const { contrWrapper } = require("../helpers/contrWrapper");

router.get("/", contrWrapper(getAll));
router.get("/:id", contrWrapper(getContactById));
router.post(
  "/",
  validateContact(contactsSchema),
  contrWrapper(addNewContact)
);
router.delete("/:id", contrWrapper(deleteContact));
router.put("/:id", contrWrapper(updateCurrentContact));

module.exports = router;
