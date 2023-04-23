const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.contactAddSchema), ctrl.create);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validateBody(schemas.contactUpdateSchema), ctrl.update);

module.exports = router;
