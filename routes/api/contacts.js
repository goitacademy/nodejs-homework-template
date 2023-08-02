const express = require("express");

const router = express.Router();

const { isEmptyBody } = require("../../helpers");

const ctrl = require("../../controllers/controllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", isEmptyBody, ctrl.post);

router.delete("/:contactId", ctrl.remove);

router.put("/:id", isEmptyBody, ctrl.put);

module.exports = router;
