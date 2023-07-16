const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addNewContact,
  updateContactId,
  updateStatusContact,
  removeContactId,
} = require("../../controller/contact.controller");
const { validateContact } = require("../../middleware/validateContact");
// const schema = require("../../schema/contactSchema");
const { schemas } = require("../../schema/contactSchema");
const { contrWrapper } = require("../../helper/contrWrapper");

router.get("/", contrWrapper(getAll));
router.get("/:contactId", contrWrapper(getById));
router.post(
  "/",
  validateContact(schemas.contactSchema),
  contrWrapper(addNewContact)
);
router.patch(
  "/:contactId/favorite",
  validateContact(schemas.updateFavoriteSchema),
  contrWrapper(updateStatusContact)
);
router.put(
  "/:contactId",
  validateContact(schemas.contactSchema),
  contrWrapper(updateContactId)
);
router.delete("/:contactId", contrWrapper(removeContactId));
module.exports = router;
