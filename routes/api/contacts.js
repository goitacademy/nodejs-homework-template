const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contactControllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.post);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.putById);

module.exports = router;
