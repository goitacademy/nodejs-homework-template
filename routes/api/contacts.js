const express = require("express");
const { schemas } = require("../../schemas/contacts");
const router = express.Router();
const ctrl = require("../../controlers/contacts");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const validateBody = require("../../middlewares/validatebody");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.remuveById)
);

router.put("/:contactId", ctrlWrapper(ctrl.remuveById));

module.exports = router;
