const express = require("express");

const controller = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:contactId", controller.getById);
router.post("/", controller.add);
router.delete("/:contactId", controller.removeById);
router.put("/:contactId", controller.updateById);

module.exports = router;