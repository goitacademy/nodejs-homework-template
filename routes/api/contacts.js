const express = require("express");

const router = express.Router();

const ctrl = require("../../controlllers/contactController");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:id", ctrl.remove);

router.put("/:id", ctrl.update);

module.exports = router;
