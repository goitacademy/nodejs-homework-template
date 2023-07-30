const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.post);

router.delete("/:id", ctrl.remove);

router.put("/:id", validateBody(schemas.addSchema), ctrl.put);

module.exports = router;
