const express = require('express');
const {contacts: ctrl} = require("../../controllers")
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");


const validateMiddleware = validation(contactSchema);

const router = express.Router()


router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router
