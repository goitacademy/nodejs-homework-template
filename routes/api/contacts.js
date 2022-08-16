const express = require("express");
const controller = require("../../controlers/contacts");
const { controllerWrapper } = require("../../helpers");
const { validationBody } = require("../../middlewares");
const schemas = require("../../schemas/contact");
const router = express.Router();

router.get("/", controllerWrapper(controller.getAll));

router.get("/:contactId", controllerWrapper(controller.getById));

router.post("/", validationBody(schemas.add), controllerWrapper(controller.add));

router.put("/:contactId", validationBody(schemas.add), controllerWrapper(controller.updateContactId));

router.delete("/:contactId", controllerWrapper(controller.deleteContact));

module.exports = router;
