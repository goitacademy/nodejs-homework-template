const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:id", ctrl.deleteById);

router.put("/:contactId", ctrl.updateById);

module.exports = router;
