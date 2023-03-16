const express = require("express");

const { validation } = require("../../middlewares");
const { contactsSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const validationMiddleware = validation(contactsSchema);
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validationMiddleware, ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", validationMiddleware, ctrl.updateById);

module.exports = router;
