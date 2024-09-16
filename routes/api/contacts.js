const express = require("express");

const ctrl = require("../../controllers/contact");

const { validateBody } = require("../../middleWares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addschema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(schemas.addschema), ctrl.update);

module.exports = router;