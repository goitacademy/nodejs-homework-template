const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const { addSchema } = require("../../models/contact");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put("/:contactId", isValidId, validateBody(addSchema), ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
