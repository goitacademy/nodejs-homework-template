const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { isValidId } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:id", isValidId, ctrl.removeById);

router.put("/:id", isValidId, ctrl.updateById);

router.patch("/:id/favorite", isValidId, ctrl.updateFavorite);

module.exports = router;

