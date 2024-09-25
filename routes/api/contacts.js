const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addScheme),
  ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addScheme),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteScheme),
  ctrlWrapper(ctrl.updateFavorit)
);

module.exports = router;
