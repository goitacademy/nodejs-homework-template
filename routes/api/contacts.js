const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:contactId/favorite", ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
