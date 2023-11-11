const express = require("express");
// const moviesServise = require("../../models/contacts");
const controllers = require("../../controllers/contacts-controllers.js");

const router = express.Router();

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", controllers.addNewContact);

router.delete("/:contactId", controllers.deleteById);

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
