const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

// router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

// router.delete("/:contactId", ctrl.deletebyId);

// router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateById);

module.exports = router;
