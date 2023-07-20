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
const { isValidId } = require("../../middleware/isValidId");
const { checkRequestBody } = require("../../middleware/checkBody");
// const schema = require("../../schema/contactSchema");
const { schemas } = require("../../model/contact");
const { contrWrapper } = require("../../helper/contrWrapper");

router.get("/", contrWrapper(getAll));
router.get("/:contactId", isValidId, contrWrapper(getById));
router.post(
  "/",
  validateContact(schemas.addSchema),
  contrWrapper(addNewContact)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateContact(schemas.updateFavoriteSchema),
  contrWrapper(updateStatusContact)
);
router.put(
  "/:contactId",
  isValidId,
  checkRequestBody,
  contrWrapper(updateContactId)
);
router.delete("/:contactId", isValidId, contrWrapper(removeContactId));
module.exports = router;
