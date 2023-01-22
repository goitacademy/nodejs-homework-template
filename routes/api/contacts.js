const express = require("express");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addCont);

router.delete("/:contactId", ctrl.delCont);

router.put("/:contactId", ctrl.putCont);

module.exports = router;
