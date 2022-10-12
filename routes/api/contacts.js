const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const ctrlWrapper = require("../../utils/ctrlWrapper");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactById)
);
router.patch(
  "/:contactId/favourite",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
