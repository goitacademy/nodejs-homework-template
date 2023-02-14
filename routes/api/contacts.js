const express = require("express");

const { contacts: contactsCtrl } = require("../../controlers");
const { contactsValidation } = require("../../midlewares");
const { contactsSchema } = require("../../schemas");

const router = express.Router();

router.get("/", contactsCtrl.getAll);
router.get("/:contactId", contactsCtrl.getById);
router.post("/", contactsValidation(contactsSchema), contactsCtrl.add);

router.delete("/:contactId", async (req, res, next) => {
    res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
    res.json({ message: "template message" });
});

module.exports = router;
