const express = require("express");

const { isValidId,authenticate } = require("../../middlewares");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/",authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeById);

router.put("/:contactId",authenticate, isValidId, ctrl.update);

router.patch("/:contactId/favorite",authenticate, isValidId, ctrl.updateStatusContact);

module.exports = router;