const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const schemas = require("../../utils/validation/contactValidation");

router.get("/", ctrl.getAll);
router.get("/:id", validateBody(schemas.addSchema), ctrl.getContactById);
router.post("/", validateBody(schemas.addSchema), ctrl.postContact);
router.delete("/:id", ctrl.deleteContact);
router.put("/:id", ctrl.putContact);

module.exports = router;