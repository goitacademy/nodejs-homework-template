const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.postContact);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", ctrl.putById);

module.exports = router;
