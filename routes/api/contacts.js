const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, validId } = require("../../middlewares");

const schemes = require("../../schemes/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", validId, ctrl.getById);

router.post("/", validateBody(schemes.addSchema), ctrl.add);

// router.delete("/:contactId", validId,ctrl.remove);

// router.put("/:contactId", validateBody(schemes.addSchema),validId, ctrl.updateByID);

module.exports = router;
