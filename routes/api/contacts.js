const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validationBody } = require("../../middlewares");

const schemas = require("../../schemas/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validationBody(schemas.add), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validationBody(schemas.add),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
