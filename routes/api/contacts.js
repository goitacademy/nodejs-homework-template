const express = require("express");

const router = express.Router();
const { tryCatch, validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

router.get("/", tryCatch(ctrl.getAll));

router.get("/:id", tryCatch(ctrl.getById));

router.post("/", validation(contactSchema), tryCatch(ctrl.add));

router.delete("/:id", tryCatch(ctrl.dell));

router.put("/:id", validation(contactSchema), tryCatch(ctrl.updateById));

module.exports = router;
