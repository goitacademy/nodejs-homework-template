const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");

router.get("/", controllerWrapper(controller.getAll));

router.get("/:id", controllerWrapper(controller.getById));

router.post("/", controllerWrapper(controller.add));

router.delete("/:id", controllerWrapper(controller.removeById));

router.put("/:id", controllerWrapper(controller.updateById));

module.exports = router;
