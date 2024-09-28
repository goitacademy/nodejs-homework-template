const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller");
const { auth } = require("./users");

router.get("/", auth, ctrlContact.get);

router.get("/:contactId", auth, ctrlContact.getById);

router.post("/", auth, ctrlContact.create);

router.put("/:contactId", auth, ctrlContact.update);

router.patch("/:contactId/favorite", auth, ctrlContact.updateStatusContact);

router.delete("/:contactId", auth, ctrlContact.remove);

module.exports = router;
