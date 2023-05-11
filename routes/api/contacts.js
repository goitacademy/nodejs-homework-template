const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const validateBody = require("../../middlewares");
const { addSchema, updateFavorite } = require("../../schemas/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateBody(updateFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);
module.exports = router;
