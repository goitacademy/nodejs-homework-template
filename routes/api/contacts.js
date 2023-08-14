const express = require("express");

const router = express.Router();

const { isEmptyBody } = require("../../helpers");

const { isEmptyFavorites } = require("../../helpers");

const { isValidId, authenticate} = require("../../middlewares/")


const ctrl = require("../../controllers/controllers");

router.get("/", authenticate,  ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, isEmptyBody, ctrl.post);

router.delete("/:id", authenticate, isValidId, ctrl.remove);

router.put("/:id",isValidId, authenticate, isEmptyBody, ctrl.put);

router.patch("/:id/favorite", authenticate, isValidId , isEmptyFavorites, ctrl.patch);

module.exports = router;
