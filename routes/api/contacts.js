const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteById)
);

module.exports = router;
