const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewars")
const schemas = require("../../schemas/contacts")

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));
router.put("/:contactId", ctrlWrapper(ctrl.updateById));

module.exports = router;
