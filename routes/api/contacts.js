const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schema = require("../../schema/schema");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schema), ctrl.add);

router.delete("/:id", ctrl.deleteById);

router.put("/:id", validateBody(schema), ctrl.updateById);

module.exports = router;
