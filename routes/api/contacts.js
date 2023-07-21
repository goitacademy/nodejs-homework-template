const express = require("express");
const contactCtrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, contactCtrl.getAll);

router.get("/:contactId", authenticate, isValidId, contactCtrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactFull),
  contactCtrl.addOne
);

router.delete("/:contactId", authenticate, isValidId, contactCtrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactFull),
  contactCtrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.contactFavorite),
  contactCtrl.updateStatusContact
);

module.exports = router;
