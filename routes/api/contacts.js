const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:id", ctrl.delById);

router.put("/:id", ctrl.updateById);

router.put("/:id/favorite", ctrl.updateByIdFavor);

module.exports = router;
