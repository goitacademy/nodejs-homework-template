const express = require("express");
const { auth, validateSchema, ctrlWrapper } = require("../../middlewares");
const { addSchema, statusSchema } = require("../../models/contacts");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));
router.post("/", auth, validateSchema(addSchema), ctrlWrapper(ctrl.add));
router.delete("/:contactId", auth, ctrlWrapper(ctrl.deleteById));
router.put(
  "/:contactId",
  auth,
  validateSchema(addSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  validateSchema(statusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
