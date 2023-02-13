const express = require("express");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { contactSchema, favoriteContactSchema } = require("../../models");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();

const validateMiddleWareAdd = validation(
  contactSchema,
  "You should put name in this field"
);

const validateMiddleWarePatch = validation(
  favoriteContactSchema,
  "You should put name in this field"
);

const validateMiddleWareUpdate = validation(
  contactSchema,
  "This Field is missing"
);

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));
router.post("/", auth, validateMiddleWareAdd, ctrlWrapper(ctrl.add));
router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  auth,
  validateMiddleWareUpdate,
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  auth,
  validateMiddleWarePatch,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
