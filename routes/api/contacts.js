const express = require("express");

const controllers = require('../../controllers')
const { HttpError, ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(controllers.getAll));

router.get("/:contactId", ctrlWrapper(controllers.getById));

router.post("/", ctrlWrapper(controllers.add));

router.put("/:contactId", ctrlWrapper(controllers.updateBuId));

router.delete("/:contactId", ctrlWrapper(controllers.deleteById));

module.exports = router;
