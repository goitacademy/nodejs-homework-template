const express = require("express");

const ctrl = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.get);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.create);

router.put("/:contactId", ctrl.update);

router.patch("/:contactId/favorite", ctrl.updateFavorite);

router.delete("/:contactId", ctrl.remove);

module.exports = router;
