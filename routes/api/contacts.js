const express = require("express");
const controllers = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:id", controllers.getById);

router.post("/", controllers.create);

router.delete("/:id", controllers.remove);

router.put("/:id", controllers.update);

module.exports = router;
