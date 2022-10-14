const express = require("express");

const { addSchema } = require("../../schemas/contacts");

const { ctrlWrapper, validateBody } = require("../../helpers");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
