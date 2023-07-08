const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const expressAsync = require("express-async-handler");

router.get("/", authenticate, expressAsync(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, expressAsync(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  expressAsync(ctrl.add)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  expressAsync(ctrl.deleteById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  expressAsync(ctrl.updateFavorite)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  expressAsync(ctrl.updateById)
);

module.exports = router;
