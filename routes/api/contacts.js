const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers/");
const { validateBody } = require("../../middlewares");
const addSchema = require("../../schemas/contact");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));
router.put(
  "/:contactId",
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
