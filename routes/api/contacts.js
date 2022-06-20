const express = require("express");
const { validateSchema, ctrlWrapper } = require("../../middlewares");
const { addSchema, statusSchema } = require("../../models/contacts");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", validateSchema(addSchema), ctrlWrapper(ctrl.add));
router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));
router.put(
  "/:contactId",
  validateSchema(addSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  validateSchema(statusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
