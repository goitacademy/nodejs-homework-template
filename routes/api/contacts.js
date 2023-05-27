const express = require("express");
// const Schema = require("mongoose")
// const updateFavoretSchema = require("../../schemas/contact-schemas)
const router = express.Router();
const contactControler = require("../../controlers/contact-controler");
const authRouter = require("./authRouter");
const {
  isValidId,
  authindentity,
  validateBody,
} = require("../../decorator/index");
// const isValidId = require("../../decorator/isValidid");

// const Schema = require("../../schemas/contact-schemas");

// router.use(authindentity);
router.get("/", authindentity, contactControler.getAllContacts);

router.get("/:id", isValidId, contactControler.getContactsById);

router.patch("/:id", isValidId, contactControler.updateContact);

// CHANG POST (PUT)
router.post("/auth", authRouter);

router.post("/", contactControler.addContact);

router.delete("/:id", isValidId, contactControler.removeContacts);

router.patch("/:id/favorite", isValidId, contactControler.updateStatusContact);

module.exports = router;
