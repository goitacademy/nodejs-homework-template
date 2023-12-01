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
const { controlWrapper, bodyValidator } = require("../../decorators");
const { updateStatusContact } = require("../../models/contacts");

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
  bodyValidator(contactSchema),
  controlWrapper(updateContactData)
);

router.patch("/:contactId/favorite", controlWrapper(updateContactFavorite));

module.exports = router;
