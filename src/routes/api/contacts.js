const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/postControllers");
const validateBody = require("../../middlewares");
const schema = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.add);

router.put("/:contactId", validateBody(schema.updateSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.removeById);

module.exports = router;
