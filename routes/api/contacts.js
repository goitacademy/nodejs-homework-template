const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctlrWrapper } = require("../../helpers");

const  validateBody = require("../../middlewares");

const schemas = require("../../schemas");

const router = express.Router();

router.get("/", ctlrWrapper(ctrl.getListContacts));

router.get("/:id", ctlrWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctlrWrapper(ctrl.addContact));

router.put("/:id", validateBody(schemas.addSchema),   ctlrWrapper(ctrl.updateContact));

router.delete("/:id", ctlrWrapper(ctrl.removeContact));

module.exports = router;