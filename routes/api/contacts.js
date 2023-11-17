const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/index");
const { validateId } = require("../../middlewares/validateId");
const { validateBody } = require("../../middlewares/validator");
const { addSchema, updateFavoriteSchemas } = require("../../service/schemas/contactSchema");

router.get("/", ctrl.getContacts);
router.get("/:id", validateId, ctrl.getContact);
router.post("/", validateBody(addSchema), ctrl.createContact);
router.delete("/:id", validateId, ctrl.deleteContact);
router.put("/:id", validateId, validateBody(addSchema), ctrl.updateContact);
router.patch("/:id/favorite", validateId, validateBody(updateFavoriteSchemas), ctrl.updateStatusContact);

module.exports = router;

