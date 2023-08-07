const express = require("express");
const ctrl = require("../../controllers/contact");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", ctrl.remove);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
