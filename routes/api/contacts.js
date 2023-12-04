const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactData,
  updateContactStatus,
  updateContactFavorite,
} = require("../../controllers/controller");

const { isEmptyBody, isValidId } = require("../../middlewares");
const { contactSchema } = require("../../schemas/contacts-schemas");
const { controlWrapper } = require("../../decorators");
const {
  bodyValidator,
  contactUpdateSchema,
} = require("../../decorators/bodyValidator");
const router = express.Router();

router.get("/", controlWrapper(getAllContacts));
router.get("/:contactId", isValidId, controlWrapper(getContact));
router.post(
  "/",
  bodyValidator(contactSchema, ["name", "email", "phone"]),
  controlWrapper(createContact)
);
router.delete("/:contactId", isValidId, controlWrapper(deleteContact));
router.put(
  "/:contactId",
  isValidId,
  bodyValidator(contactUpdateSchema, ["name", "email", "phone"]),
  controlWrapper(updateContactData)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  controlWrapper(updateContactFavorite)
);

module.exports = router;
