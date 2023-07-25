const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
} = require("../../controllers");

const { schemas } = require("../../models/contact");
const { authenticate, isValidId, validateBody } = require("../../middlewares");

router.get("/", authenticate, getContacts);

router.get("/:id", authenticate, isValidId, getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactValidator),
  postContact
);

router.delete("/:id", authenticate, isValidId, deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.contactValidator, "missing required name field"),
  putContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.contactFavoriteValidator, "missing field favorite"),
  putContact
);

module.exports = router;
