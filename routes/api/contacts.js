const express = require("express");
const ctrl = require("../../controllers/contacts");
const middleware = require("../../middlewares");

const router = express.Router();

router.get("/", middleware.auth, ctrl.getAll);

router.get("/:contactId", middleware.auth, ctrl.getById);

router.post("/", middleware.auth, ctrl.add);

router.delete("/:contactId", middleware.auth, ctrl.deleteById);

router.put("/:contactId", middleware.auth, ctrl.updateById);

router.patch("/:contactId/favorite", middleware.auth, ctrl.updateFavorite);

module.exports = router;
