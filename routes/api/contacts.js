const express = require("express");
const path = require("path");
const ctrl = require(path.resolve(__dirname, "../../controllers"));
const { validateBody } = require(path.resolve(__dirname, "../../middlewares"));
const schemas = require(path.resolve(__dirname, "../../schemas"));

const router = express.Router();

router.get("/", ctrl.contacts.getAll);

router.get("/:contactId", ctrl.contacts.getById );

router.post("/", validateBody(schemas.addSchema), ctrl.contacts.add);

router.delete("/:contactId", ctrl.contacts.deleteById );

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.contacts.updateContactById);

module.exports = router;
