const express = require("express");
const {
  validationConstructor,
  controllerWrapper,
} = require("../../middlewares");
const { contactSchema } = require("../../schemes");
const { contactsControllers } = require("../../controllers");

const router = express.Router();
const validateMiddleware = validationConstructor(contactSchema);
const { getAll, getById, add, updateById, removeById } = contactsControllers;

router.get("/", getAll);

router.get("/:contactId", controllerWrapper(getById));

router.post("/", validateMiddleware, controllerWrapper(add));

router.delete("/:contactId", controllerWrapper(removeById));

router.put("/:contactId", validateMiddleware, controllerWrapper(updateById));

module.exports = router;
