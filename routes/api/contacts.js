const express = require("express");
const ctrl = require("../../controllers/contacts");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:id", isValidId, ctrl.deleteById);

router.patch("/:id", isValidId, ctrl.updateById);

router.patch("/:id/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
