const express = require("express");

const { contacts: ctrl } = require("../../controllers/index");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const router = express.Router();

const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", addContactValidation, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", addContactValidation, ctrlWrapper(ctrl.updateById));

module.exports = router;
