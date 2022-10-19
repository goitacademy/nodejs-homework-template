const express = require("express");
const ctrl = require("../../controllers/contacts");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.delete("/:contactId", authenticate, ctrl.deleteById);

router.put("/:contactId", authenticate, ctrl.putById);

router.patch("/:contactId/favorite", authenticate, ctrl.patchFavoriteById);

router.post("/", authenticate, ctrl.add);

module.exports = router;
