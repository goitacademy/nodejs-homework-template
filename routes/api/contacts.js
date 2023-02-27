const express = require('express');
const {contacts: ctrl} = require("../../controllers")
const { validation, controllerWrapper } = require("../../middlewares");
const contactSchema  = require("../../schemas/contactSchema");

const { getAll, getContactById, add, deleteById, updateById } = ctrl;


const validateMiddleware = validation(contactSchema);

const router = express.Router()


router.get("/", controllerWrapper(getAll));

router.get("/:contactId", controllerWrapper(getContactById));

router.post("/", validateMiddleware, controllerWrapper(add));

router.delete("/:contactId", controllerWrapper(deleteById));

router.put(
  "/:contactId",
  validateMiddleware,
  controllerWrapper(updateById)
);

module.exports = router;
