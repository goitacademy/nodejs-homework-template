const express = require("express");

const contactSchema = require("../../schemas/contactSchema");
const { contactsControllers: ctrl } = require("../../controllers");
const { validation, controllerWrapper } = require("../../middlewares");

const router = express.Router();

router.get("/", controllerWrapper(ctrl.getAll));
router.get("/:contactId", controllerWrapper(ctrl.getById));
router.post("/", validation(contactSchema), controllerWrapper(ctrl.add));
router.delete("/:contactId", controllerWrapper(ctrl.remove));
router.put("/:contactId", validation(contactSchema), controllerWrapper(ctrl.updateById));

module.exports = router;
