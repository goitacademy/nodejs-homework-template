const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares/middleWares");
const { contactSchema, favoriteContactSchema } = require("../../models/index");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();
const validateMiddleWareUpdate = validation(
  contactSchema,
  "This Field is missing"
);
const validateMiddleWareAdd = validation(
  contactSchema,
  "You should put name in this field"
);

const validateMiddleWarePatch = validation(
  favoriteContactSchema,
  "You should put name in this field"
);

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", validateMiddleWareAdd, ctrlWrapper(ctrl.add));
router.delete("/:contactId", ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  validateMiddleWareUpdate,
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  validateMiddleWarePatch,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
