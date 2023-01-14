const express = require("express");
const ctrl = require("../../controllers/contacts");
const { authenticate, validateBody } = require("../../middlewares");
const {schemas} = require("../../models/contact")

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);
router.get("/:contactId", authenticate, ctrl.getContact);
router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.postContact);
router.delete("/:contactId", authenticate, ctrl.deleteContact);
router.put("/:contactId", authenticate, validateBody(schemas.updateSchema), ctrl.updateContact);
router.patch("/:contactId/favorite", authenticate, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router;
