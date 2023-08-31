const express = require("express");

const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.remove);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.update);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateStatusSchema), ctrl.updateStatus);

module.exports = router;
