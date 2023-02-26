const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts");

const { isValidId } = require("../../middlewares");

router.get("/", controllers.listContacts);

router.get("/:id", isValidId, controllers.getContactById);

router.post("/", controllers.addContact);

router.delete("/:id", isValidId, controllers.removeContact);

router.put("/:id", isValidId, controllers.updateContact);

router.patch("/:id/favorite", isValidId, controllers.updateStatusContact);

module.exports = router;
