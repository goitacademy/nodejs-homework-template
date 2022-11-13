const express = require("express");
const router = express.Router();
const controller = require("../../controller");
const {wrapper} = require("../../helpers/tryCatch");
const {validCreate, validUpdate} = require("../../middleWare/validation");

router.get("/", wrapper(controller.getAllContact));
router.post("/", validCreate, wrapper(controller.addContact));
router.get("/:contactId", wrapper(controller.getContactById));
router.delete("/:contactId", wrapper(controller.removeContact));
router.patch("/:contactId", validUpdate, wrapper(controller.updateContact));

module.exports = router;
