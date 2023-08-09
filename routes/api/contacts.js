const express = require("express");

const router = express.Router();

const { isEmptyBody } = require("../../helpers");

const { isEmptyFavorites } = require("../../helpers");

const { isValidId } = require("../../middlewares/")

const ctrl = require("../../controllers/controllers");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", isEmptyBody, ctrl.post);

router.delete("/:id", isValidId, ctrl.remove);

router.put("/:id",isValidId, isEmptyBody, ctrl.put);

router.patch("/:id/favorite", isValidId , isEmptyFavorites, ctrl.patch);

module.exports = router;
