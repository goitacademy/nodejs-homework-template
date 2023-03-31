const express = require("express");
const controllers = require("../../controllers/contactControllers");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:id", controllers.getContactById);

router.post("/", controllers.addContact);

router.delete("/:id", controllers.removeContact);

router.put("/:id", controllers.updateContact);

module.exports = router;
