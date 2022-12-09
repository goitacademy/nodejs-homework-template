const express = require("express");
const { validationConstructor } = require("../../middlewares");
const { contactSchema } = require("../../schemes");
const { contactsControllers } = require("../../controllers");

const router = express.Router();
const validateMiddleware = validationConstructor(contactSchema);
const { getAll, getById, add, updateById, removeById } = contactsControllers;

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateMiddleware, add);

router.delete("/:contactId", removeById);

router.put("/:contactId", validateMiddleware, updateById);

module.exports = router;
