const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/constacts");

router.get("/", controllers.getAll);

// router.get("/:contactId", controllers.getById);

// router.post("/", controllers.addContact);

// router.delete("/:contactId", controllers.deleteContact);

// router.put("/:contactId", controllers.changeContact);

module.exports = router;