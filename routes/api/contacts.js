const express = require("express");
const contactsController = require("../../controllers/contacts");

const router = express.Router();

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getById);
router.post("/", contactsController.add);
router.put("/:id", contactsController.updateById);
router.delete("/:id", contactsController.deleteById);

module.exports = router;
