const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewars");
const schemas = require("../../schemas/contacts");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById));
router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);
router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.deleteById));
router.put("/:contactId", authenticate, ctrlWrapper(ctrl.updateById));
router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.statusJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
