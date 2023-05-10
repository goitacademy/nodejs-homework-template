const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/contacts");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const validateBody = require("../../middlewares/validatebody");
const { addSchema } = require("../../schemas/contacts");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.add));

router.delete(
  "/:contactId",
  validateBody(addSchema),
  ctrlWrapper(ctrl.remuveById)
);

router.put("/:contactId", ctrlWrapper(ctrl.remuveById));

module.exports = router;
