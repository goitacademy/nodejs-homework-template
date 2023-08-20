const express = require("express");
const router = express.Router();
const jsonParcer = express.json();
const contactControllers = require("../../controllers/contacts");

router.get("/", contactControllers.getAll);

router.get("/:contactId", contactControllers.getById);

router.post("/", jsonParcer, contactControllers.add);

router.delete("/:contactId", contactControllers.remove);

router.put("/:contactId", jsonParcer, contactControllers.update);

router.put("/:contactId/favorite/", contactControllers.isFavorite);

module.exports = router;
