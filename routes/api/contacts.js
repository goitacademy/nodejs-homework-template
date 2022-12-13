const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");

const { schemes } = require("../../models/contacts");

const router = express.Router();
router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validateBody(schemes.addSchema),
  ctrlWrapper(ctrl.createContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",

  isValidId,
  validateBody(schemes.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemes.updateFavoriteScheme),
  ctrlWrapper(ctrl.updateStatusContact)
);
module.exports = router;
