const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schema = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

// router.get("/:contactId", getById);

// router.post("/", validateBody(schema.addSchema), add);

// router.put("/:contactId", validateBody(schema.addSchema), updateById);

// router.delete("/:contactId", deleteById);

module.exports = router;
