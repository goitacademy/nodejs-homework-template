const express = require("express");
const controller = require("../../controllers/contacts");
const validateData = require("../../middlewares/validateData");
const shema = require("../../Shems/contacts");

const router = express.Router();

router.get("/", controller.getAll);

router.get("/:contactId", controller.getById);

router.post("/", validateData(shema), controller.add);

router.delete("/:contactId", controller.remove);

router.put("/:contactId", validateData(shema), controller.update);

module.exports = router;
