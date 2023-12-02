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

const { isEmptyBody } = require("../../middlewares");
const { contactSchema } = require("../../schemas/contacts-schemas");
const { controlWrapper } = require("../../decorators");
const {
  bodyValidator,
  contactUpdateSchema,
} = require("../../decorators/bodyValidator");
const router = express.Router();

router.get("/", controlWrapper(getAllContacts));

router.get("/:contactId", controlWrapper(getContact));

router.post(
  "/",
  isEmptyBody,
  bodyValidator(contactSchema),
  controlWrapper(createContact)
);

router.delete("/:contactId", controlWrapper(deleteContact));

router.put(
  "/:contactId",
  isEmptyBody,
  bodyValidator(contactUpdateSchema),
  controlWrapper(updateContactData)
);

router.patch("/:contactId/favorite", controlWrapper(updateContactFavorite));

module.exports = router;
