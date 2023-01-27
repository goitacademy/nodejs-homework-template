const express = require("express");
const router = express.Router();

const validation = require("../../middlewares");
const contactSchema = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactSchema);

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateMiddleware, ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validateMiddleware, ctrl.update);

module.exports = router;
