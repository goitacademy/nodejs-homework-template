const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller/contacts");
const auth = require("../../service/auth");

router.get("/", auth, ctrlContact.get);

router.get("/:id", auth, ctrlContact.getById);

router.post("/", auth, ctrlContact.create);

router.put("/:id", auth, ctrlContact.update);

router.patch("/:id/favorite", auth, ctrlContact.updateFavorite);

router.delete("/:id", auth, ctrlContact.remove);

module.exports = router;
