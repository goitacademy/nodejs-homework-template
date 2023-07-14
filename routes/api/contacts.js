const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const { addSchema } = require("../../models/contact");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put("/:contactId", authenticate, isValidId, validateBody(addSchema), ctrl.updateById);

router.patch("/:contactId/favorite", authenticate, isValidId, ctrl.updateStatusContact);

module.exports = router;
