const express = require("express");
const router = express.Router();
const operations = require("../../models/contacts");

const controller = require("../../controllers/index");
const errorHandler = require("../../helpers/errorHandler");
router.get("/", errorHandler(controller.getAll));

router.get("/:contactId", errorHandler(controller.getById));

router.post("/", errorHandler(controller.add));

router.delete("/:contactId", errorHandler(controller.remove));

router.put("/:contactId", errorHandler(controller.update));

module.exports = router;