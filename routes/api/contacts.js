const express = require("express");
const controllers = require("../../controllers/contacts");

const router = express.Router();

module.exports =() => { router.get("/list", controllers.listContacts);
router.get("/:id", controllers.getContactById);
router.post("/contacts", controllers.addContacts);
router.delete("/:id", controllers.deleteContacts);
router.put("/:id", controllers.updateContacts); return router};
