const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const shema = require("../../schemas/joiSchema");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(shema.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  validateBody(shema.addSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
