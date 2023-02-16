const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getContactById);
router.post("/", ctrl.add);
router.delete("/:contactId", ctrl.deleteById);
router.put("/:contactId", ctrl.updateById);

module.exports = router;
