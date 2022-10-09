const express = require("express");
const {
  addSchema,
  updateSchema,
} = require("../../middleware/middlewareSchemas");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", addSchema, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put("/:contactId", updateSchema, ctrlWrapper(ctrl.updateById));

module.exports = router;
