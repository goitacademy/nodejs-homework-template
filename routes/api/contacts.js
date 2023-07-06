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
const { validateBody, isValid } = require("../../middlewares");

router.get("/", getAllContacts);
router.get("/:contactId", isValid, getContactId);
router.post("/", validateBody(schemas.joiSchema, "fields"), postContact);
router.put(
  "/:contactId",
  isValid,
  validateBody(schemas.joiSchema, "fields"),
  putContact
);
router.delete("/:contactId", isValid, deleteContact);
router.patch(
  "/:contactId/favorite",
  isValid,
  validateBody(schemas.updateFavoriteSchema, "fields favorite"),
  putchContact
);

module.exports = router;
