const express = require("express");

const router = express.Router();
const { validation } = require("../../middlewares");
const schemas = require("../../schemas/contact");
const { ctrlWrapper } = require("../../helpers");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAllContacts));
router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:id",
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
