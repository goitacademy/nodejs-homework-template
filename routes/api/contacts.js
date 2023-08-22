const express = require("express");
const {
  getContacts,
  getById,
  addNewContact,
  deleteById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contscts");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/contact");
const isValidId = require("../../middlewares/isValidId");
const validateBodyFavorite = require("../../middlewares/validateBodyFavorite");
const authenticate = require("../../middlewares/authenticate");
const router = express.Router();

router.get("/", authenticate, getContacts);

router.get("/:id", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(schemas.addSchema), addNewContact);

router.delete("/:id", authenticate, isValidId, deleteById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBodyFavorite(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
