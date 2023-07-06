const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
    // res.json({ message: "template message" });
    res.json(await contacts.listContacts());
});

router.get("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    // res.json({ message: `${contactId}` });
    res.json(await contacts.getContactById(contactId));
});

router.post("/", async (req, res, next) => {});

router.delete("/:contactId", async (req, res, next) => {
    res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
    res.json({ message: "template message" });
});

module.exports = router;
