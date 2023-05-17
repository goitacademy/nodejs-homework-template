const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const addSchema = require("../../models/contacts");
const isValid = require("../../middlewares/isValid");
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValid, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", isValid, ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  isValid,
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:id/favorite",
  isValid,
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
module.exports = router;
