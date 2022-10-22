const express = require("express");
const { schemaValidation } = require("../../middlewares/validationMiddleware");
const handleCatchErrors = require("../../middlewares/errorHandler");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", handleCatchErrors(ctrl.getAll));

router.get("/:contactId", handleCatchErrors(ctrl.getById));

router.post("/", schemaValidation, ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", schemaValidation, ctrl.updateById);

router.patch("/:contactId/favorite", ctrl.updateStatus);

module.exports = router;