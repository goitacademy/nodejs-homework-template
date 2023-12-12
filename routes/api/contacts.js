const express = require("express");

// const { ctrl } = require("../../controllers/index");
const {
  getContactList,
  getContactById,
  addContact,
  updateFavorite,
  deleteContact,
  updateContact,
} = require("../../controllers/index");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getContactList.getContactList);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  getContactById.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  addContact.addContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite.updateFavorite
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  deleteContact.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateContact.updateContact
);

module.exports = router;
