const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.add);
router.put("/:id", ctrl.updateById);
router.delete("/:id", ctrl.removeById);

module.exports = router;
