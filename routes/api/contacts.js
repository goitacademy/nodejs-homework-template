const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("./controller");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.put("/:contactId", ctrl.update);

router.delete("/:contactId", ctrl.del);

module.exports = router;
