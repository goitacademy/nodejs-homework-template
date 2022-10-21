const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const { ctlrWrapper } = require("../../helpers");
const  validateBody = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", ctlrWrapper(ctrl.getListContacts));

router.get("/:id", ctlrWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctlrWrapper(ctrl.addContact));

router.put("/:id", validateBody(schemas.addSchema), ctlrWrapper(ctrl.updateContact));

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctlrWrapper(ctrl.updateStatusContact));

router.delete("/:id", ctlrWrapper(ctrl.removeContact));

module.exports = router;