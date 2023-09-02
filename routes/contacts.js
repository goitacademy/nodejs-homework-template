const express = require("express");

const ContactController = require("../controllers/contact")

const Schemas = require('./contacts/schemas');

const router = express.Router();

const validate = require('../middleware/validation');

const jsonParser = express.json()

router.get("/", ContactController.getAll);
router.get("/:id", validate(Schemas.getContact), ContactController.getById);
router.post("/", jsonParser, validate(Schemas.createContact), ContactController.create);
router.delete("/:id", validate(Schemas.deleteContact), ContactController.remove);
router.put("/:id", jsonParser, validate(Schemas.updateContact), ContactController.update);
router.patch("/:id", jsonParser, validate(Schemas.updateStatus), ContactController.updateStatus);

module.exports = router;
