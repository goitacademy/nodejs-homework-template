const express = require("express");
const router = express.Router();
const controller = require("../../controller");
const {wrapper} = require("../../helpers/tryCatch");

router.get("/", wrapper(controller.getAllContact));
router.post("/", wrapper(controller.addContact));
router.get("/:contactId", wrapper(controller.getContactById));
router.delete("/:contactId", wrapper(controller.removeContact));
router.patch("/:contactId", wrapper(controller.updateContact));

module.exports = router;
