const express = require("express");
const controllers = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", controllerWrapper(controllers.getAll));

router.get("/:contactId", controllerWrapper(controllers.getById));

router.post("/", controllerWrapper(controllers.add));

router.delete("/:contactId", controllerWrapper(controllers.removeById));

router.put("/:contactId", controllerWrapper(controllers.updateById));

module.exports = router;
