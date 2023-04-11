const express = require("express");
const ctrl = require("../../controllers/index");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validation, updateContactValidation } = require("../../middlewares");
const { contactShema, addShema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(addShema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  updateContactValidation(contactShema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
