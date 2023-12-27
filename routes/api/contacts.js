const express = require("express");

const controllers = require("../../controllers/contacts");

const { wrapper } = require("../../helpers");

const router = express.Router();

router.get("/", wrapper(controllers.getAllContacts));

router.get("/:id", wrapper(controllers.getContactById));

router.post("/", wrapper(controllers.addContact));

router.delete("/:id", wrapper(controllers.removeContact));

router.put("/:id", wrapper(controllers.updateContact));

module.exports = router;
