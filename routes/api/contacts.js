const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getOne);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", ctrl.updateById);

module.exports = router;
