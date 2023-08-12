const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, checkBody } = require("../../middlewares");
const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);
router.get("/:id", isValidId, ctrl.getContactById);
router.post("/", checkBody, validateBody(schemas.validationSchema),ctrl.addContact);
router.patch("/:id/favorite", isValidId, validateBody(schemas.updateStatusContactSchema), ctrl.updateStatusContact);
router.put("/:id", checkBody, validateBody(schemas.validationSchema), ctrl.updateContact);
router.delete("/:id",isValidId, ctrl.removeContact);

module.exports = router;
