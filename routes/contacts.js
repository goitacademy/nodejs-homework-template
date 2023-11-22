const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const jsonParser = express.json();
const isValidId = require("../middleware/isValidId");

router.get("/", Controller.getContacts);

router.get("/:id", isValidId, Controller.getContact);

router.post("/", jsonParser, Controller.createContact);

router.put("/:id", jsonParser, Controller.updateContact);

router.patch("/:id/favorite", jsonParser, Controller.updateStatusContact);

router.delete("/:id", Controller.deleteContact);

module.exports = router;
