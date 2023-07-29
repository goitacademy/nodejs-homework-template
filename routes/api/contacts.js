const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.post);

router.delete("/:id", ctrl.remove);

router.put("/:id", ctrl.put);

module.exports = router;
