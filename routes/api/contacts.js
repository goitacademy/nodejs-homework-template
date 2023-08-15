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
const router = express.Router();

router.get("/", getContacts);

router.get("/:id", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), addNewContact);

router.delete("/:id", isValidId, deleteById);

router.put("/:id", isValidId, validateBody(schemas.addSchema), updateById);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBodyFavorite(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
