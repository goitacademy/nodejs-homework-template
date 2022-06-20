const express = require("express");
const router = express.Router();

const controllers  = require("../../controllers");
const controlWrapper = require("../../helpers/controlWrapper");

router.get("/", controlWrapper(controllers.getAll));

router.get("/:id", controlWrapper(controllers.getContactById));

router.post("/", controlWrapper(controllers.addContact));

router.delete("/:id", controlWrapper(controllers.removeContact));

router.put("/:id", controlWrapper(controllers.updateContact));

module.exports = router;
