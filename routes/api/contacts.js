const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.put("/:contactId", ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
