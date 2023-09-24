const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const schemas = require("../../shemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", validateBody(schemas.addSchema), ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.postContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", ctrl.putContact);

module.exports = router;
