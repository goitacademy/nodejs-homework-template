const express = require("express");

const router = express.Router();

const { isEmptyBody } = require("../../helpers");

const { isEmptyFavorites } = require("../../helpers");

const {isValidId} = require("../..middlewares/")
const ctrl = require("../../controllers/controllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", isEmptyBody, ctrl.post);

router.delete("/:contactId",ctrl.remove);

router.put("/:id", isEmptyBody, ctrl.put);

router.patch("/:id/favorite",isEmptyFavorites, ctrl.patch);

module.exports = router;
