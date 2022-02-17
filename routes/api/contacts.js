const express = require("express");

const { ctrlWrapper, validation } = require("../../middleware");
const ctrl = require("../../controllers/products");
const { contactSchema } = require("../../schemas/contact");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.put("/:id", validation(contactSchema), ctrlWrapper(ctrl.updateById));

module.exports = router;
