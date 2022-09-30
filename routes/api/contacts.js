const express = require("express");
const { schemaValidation } = require("../../middlewares/validationMiddleware");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", schemaValidation, ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", schemaValidation, ctrl.updateById);

module.exports = router;