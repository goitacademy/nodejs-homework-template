const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const addSchema = require("../../shemes/contacts");
const validateBody = require("../../middlewares/validateBody");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.post);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(addSchema), ctrl.put);

module.exports = router;
