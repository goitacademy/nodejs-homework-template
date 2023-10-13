const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addNewContact,
  updateContactId,
  updateStatusContact,
  removeContactId,
} = require("../../controller/contact.controller");
const { validateContact } = require("../../middleware/validateContact");
const { authMiddleware } = require("../../middleware/auth");
const { isValidId } = require("../../middleware/isValidId");
const { checkRequestBody } = require("../../middleware/checkBody");
const { schemas } = require("../../model/contact");
const { contrWrapper } = require("../../helper/contrWrapper");

router.get("/", authMiddleware, contrWrapper(getAll));
router.get("/favorite", authMiddleware, contrWrapper(getAll));
router.get("/:contactId", authMiddleware, isValidId, contrWrapper(getById));
router.post(
  "/",
  authMiddleware,
  validateContact(schemas.addSchema),
  contrWrapper(addNewContact)
);
router.patch(
  "/:contactId/favorite",
  authMiddleware,
  isValidId,
  validateContact(schemas.updateFavoriteSchema),
  contrWrapper(updateStatusContact)
);
router.put(
  "/:contactId",
  authMiddleware,
  isValidId,
  checkRequestBody,
  contrWrapper(updateContactId)
);
router.delete(
  "/:contactId",
  authMiddleware,
  isValidId,
  contrWrapper(removeContactId)
);
module.exports = router;
