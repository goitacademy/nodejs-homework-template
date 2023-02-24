// const fs = require("fs/promises");
const express = require("express");
const { isValidId } = require("../../middlewares");
const controller = require("../../controllers/contacts");
const router = express.Router();

router.get("/", controller.getAll);

router.get("/:contactId", isValidId, controller.getById);

router.post("/", controller.add);

router.delete("/:contactId",isValidId, controller.deleteById);

router.put("/:contactId", isValidId, controller.updateById);

router.patch("/:contactId/favorite", isValidId, controller.updateFavorite);

module.exports = router;
