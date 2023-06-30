const express = require("express");
const ctrl = require("../../controlers/contacts");
const { validateBody } = require("../../middlewares");
const contactSchema = require("../../schemas/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(contactSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(contactSchema), ctrl.updateById);

module.exports = router;
