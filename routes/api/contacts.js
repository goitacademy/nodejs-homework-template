const express = require("express");

const router = express.Router();

const validateBody = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const { getAll, getById, add, deleteById, updateById } = require('../../controllers/contacts');

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validateBody(schemas.addSchema), add);

router.delete("/:id", deleteById);

router.put("/:id", validateBody(schemas.addSchema), updateById);

module.exports = router;
