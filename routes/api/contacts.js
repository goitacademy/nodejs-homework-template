const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/contacts");

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", controllers.add);

router.delete("/:contactId", controllers.deleteById);

router.put("/:id", controllers.updateById);

module.exports = router;
