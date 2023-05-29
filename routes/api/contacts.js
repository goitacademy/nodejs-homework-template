const express = require("express");
const ctrl = require("../../controllers/controller");
const { isValidId } = require("../../middlewares/isValidid");
const { schemas } = require("../../models/contacts");
const { validateFavorite } = require("../../middlewares/validateFavorite");
const { validateBody } = require("../../middlewares/validateBody");
const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, ctrl.getContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.createContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavorite(schemas.updateFavorite),
  ctrl.updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeById);

module.exports = router;
