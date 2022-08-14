const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validationBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validationBody(schemas.add), ctrlWrapper(ctrl.add));

router.put("/:contactId", validationBody(schemas.add), ctrlWrapper(ctrl.updateById));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
