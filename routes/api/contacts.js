const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getContactId,
  postContact,
  putContact,
  deleteContact,
  putchContact,
} = require("../../controllers/contacts-controller");

const { schemas } = require("../../models/contact");
const { validateBody, isValid, authMiddleware } = require("../../middlewares");

router.get("/", authMiddleware, getAllContacts);
router.get("/:contactId", authMiddleware, isValid, getContactId);
router.post(
  "/",
  authMiddleware,
  validateBody(schemas.joiSchema, "fields"),
  postContact
);
router.put(
  "/:contactId",
  authMiddleware,
  isValid,
  validateBody(schemas.joiSchema, "fields"),
  putContact
);
router.delete("/:contactId", authMiddleware, isValid, deleteContact);
router.patch(
  "/:contactId/favorite",
  authMiddleware,
  isValid,
  validateBody(schemas.updateFavoriteSchema, "fields favorite"),
  putchContact
);

module.exports = router;
