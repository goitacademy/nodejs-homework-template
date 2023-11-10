const express = require("express");

const router = express.Router();
const jsonParser = express.json();

const Controller = require("../controllers/controller");

router.get("/", Controller.getContacts);

router.get("/:id", Controller.getContact);

router.post("/", jsonParser, Controller.createContact);

router.put("/:id", jsonParser, Controller.updateContact);

router.patch("/:id", Controller.updateStatusContact);

router.delete("/:id", Controller.deleteContact);

module.exports = router;
