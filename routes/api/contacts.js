const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateContactFavorite,
} = require("../../controllers/contacts");
const validation = require("../../middlewares/validation");
const tryCatchWrapper = require("../../middlewares/tryCatchWrapper");
const {
  createContactJoiSchema,
  updateContactJoiSchema,
  favoriteContactJoiSchema,
  contactJoiId,
} = require("../../models/contact");

const router = express.Router();

router
  .get("/", tryCatchWrapper(getContacts))
  .post(
    "/",
    validation("body", createContactJoiSchema),
    tryCatchWrapper(addContact)
  );

router
  .get(
    "/:contactId",
    validation("params", contactJoiId),
    tryCatchWrapper(getContactById)
  )
  .put(
    "/:contactId",
    [
      validation("params", contactJoiId),
      validation("body", updateContactJoiSchema),
    ],
    tryCatchWrapper(updateContact)
  )
  .delete(
    "/:contactId",
    validation("params", contactJoiId),
    tryCatchWrapper(deleteContact)
  )
  .patch(
    "/:contactId/favorite",
    [
      validation("params", contactJoiId),
      validation("body", favoriteContactJoiSchema),
    ],
    tryCatchWrapper(updateContactFavorite)
  );

module.exports = router;
