const express = require("express");

const ContactController = require("../controllers/contact");

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactController.getAll);
router.post("/", jsonParser, ContactController.create);

router.get("/:id", ContactController.getById);
router.put("/:id", jsonParser, ContactController.update);
router.delete("/:id", ContactController.remove);

module.exports = router;