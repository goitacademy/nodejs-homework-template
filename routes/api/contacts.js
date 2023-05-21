const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contactsControl");

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getById);
router.post("/", ctrl.addCont);
router.delete("/:contactId", ctrl.deleteById);
router.put("/:contactId", ctrl.updateById);

module.exports = router;
