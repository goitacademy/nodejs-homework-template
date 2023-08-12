const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");

const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", auth, ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", ctrl.updateById);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
