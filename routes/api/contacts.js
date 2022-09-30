const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const { addSchema, updateSchema } = require("../../schemas");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateBody(updateSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
