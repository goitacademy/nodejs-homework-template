const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contact");

const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
