const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.addCont);

router.put("/:id", ctrl.updateCont);

router.delete("/:id", ctrl.deleteCont);

module.exports = router;
