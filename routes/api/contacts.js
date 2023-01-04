// const validation = require("../../models/validation");
const express = require("express");
const router = express.Router();
const controller = require("./controllers/index");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.add);
router.delete("/:contactId", controller.removeById);
router.put("/:id", controller.updateById);

module.exports = router;
