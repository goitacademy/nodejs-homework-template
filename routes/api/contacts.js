const express = require('express')

const { getAll, getById, addItem, deleteById, updateById } = require('../../controllers/controllers');

const router = express.Router()

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(schemas.addSchema), addItem);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validateBody(schemas.addSchema), updateById);

module.exports = router;

module.exports = router
