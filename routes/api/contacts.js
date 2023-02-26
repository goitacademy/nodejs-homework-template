const express = require("express");

const controllers = require("../../controllers/contacts");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:id", isValidId, controllers.getContactById);

router.post("/", controllers.addContact);

router.delete("/:id", isValidId, controllers.removeContact);

router.put("/:id", isValidId, controllers.updateContact);

router.patch("/:id/favorite", isValidId, controllers.updateStatusContact);

module.exports = router;
