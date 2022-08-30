const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const { validationBody } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validationBody(schemas.add), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validationBody(schemas.add),
  ctrlWrapper(ctrl.updateContactById)
);

module.exports = router;
