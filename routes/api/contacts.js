const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: cntr } = require("../../controlers");

const validateMiddleware = validation(contactSchema)

const router = express.Router();

router.get("/", ctrlWrapper(cntr.getAll));

router.get("/:contactId", ctrlWrapper(cntr.getById));

router.post("/", validateMiddleware, ctrlWrapper(cntr.add));

router.delete("/:contactId", ctrlWrapper(cntr.removeById));

router.put("/:contactId", validateMiddleware, ctrlWrapper(cntr.updateById));

module.exports = router;
