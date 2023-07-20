const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
} = require("../../controllers/conrollers");

const { schemas } = require("../../models/contactModel");
const { isValidId, validateBody } = require("../../middlewares");

router.get("/", getContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", validateBody(schemas.contactValidator), postContact);

router.delete("/:id", isValidId, deleteContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactValidator, "missing required name field"),
  putContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.contactFavoriteValidator, "missing field favorite"),
  putContact
);

module.exports = router;
