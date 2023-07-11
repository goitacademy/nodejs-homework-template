const express = require("express");

const ctrl = require("../../controllers/contacts");

const { addSchema } = require("../../schemas/contacts");
const { validateBody } = require("../../middleware");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.addById);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", validateBody(addSchema), ctrl.updateById);

module.exports = router;
