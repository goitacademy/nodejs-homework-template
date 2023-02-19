const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.upDateById);

module.exports = router;
