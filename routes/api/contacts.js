const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.putById);

router.post("/", ctrl.add);

module.exports = router;
