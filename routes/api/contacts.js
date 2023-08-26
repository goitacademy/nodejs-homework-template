const express = require("express");
const contactControllers = require("../../controllers/contacts/index");
const router = express.Router();
const jsonParcer = express.json();

router.get("/", contactControllers.getAll);

router.get("/:contactId", contactControllers.getById);

router.post("/", jsonParcer, contactControllers.add);

router.delete("/:contactId", contactControllers.remove);

router.put("/:contactId", jsonParcer, contactControllers.update);

router.put("/:contactId/favorite/", contactControllers.isFavorite);

module.exports = router;
