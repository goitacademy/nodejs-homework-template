const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:id", ctrl.deleteById);

router.patch("/:id", ctrl.updateById);

module.exports = router;
