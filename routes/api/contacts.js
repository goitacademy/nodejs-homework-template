const express = require("express");
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const { addSchema } = require('../../schemas/contacts');

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validateBody(addSchema), ctrl.updateById);

module.exports = router;
