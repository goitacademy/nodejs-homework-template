const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const addContactSchema = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addContactSchema), ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", validateBody(addContactSchema), ctrl.updateById);

module.exports = router;
