const express = require("express");

const router = express.Router();

const { contactsSchema } = require("../../schemas");
const { validation, ctrlWrapper } = require("../../middlewares");

const ctrl  = require("../../controllers/contacts");


router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactsSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.deleteById));

module.exports = router;