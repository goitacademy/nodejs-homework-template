const express = require("express");
// const Schema = require("mongoose")
// const updateFavoretSchema = require("../../schemas/contact-schemas)
const router = express.Router();
const contactControler = require("../../controlers/contact-controler");
const authRouter = require("../api/authRouter");
const isValidId = require("../../decorator/isValidid");

// const Schema = require("../../schemas/contact-schemas");
// const validateBody = require("../../decorator/validateBody");
router.use("/auth", require("./authRouter"));

router.get("/", contactControler.getAllContacts);

router.get("/:id", isValidId, contactControler.getContactsById);

router.patch("/:id", isValidId, contactControler.updateContact);

// CHANG POST (PUT)

router.post("/", contactControler.addContact);

router.delete("/:id", isValidId, contactControler.removeContacts);

router.patch("/:id/favorite", isValidId, contactControler.updateStatusContact);

module.exports = router;
