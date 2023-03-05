const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/contacts");

const isValidId = require("../../middlewares/isValidId");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.add);

// router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put("/:contactId", isValidId, ctrl.changeContact);

module.exports = router;
