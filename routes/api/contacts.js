const express = require("express");
const controllers = require("../../controllers/contacts");

const router = express.Router();

router.post("/", controllers.addContacts);
router.delete("/:id", controllers.deleteContacts);
router.get("/", controllers.getContacts);
router.put("/:id", controllers.updateContacts);

module.exports = router;
