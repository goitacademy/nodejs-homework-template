const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemes = require("../../schemes/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemes.addScheme), ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validateBody(schemes.addScheme), ctrl.updateByID);

module.exports = router;
