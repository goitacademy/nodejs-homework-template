const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const ctrlContact = require("../controllers/contact.controller");

router.get("/contacts", auth, ctrlContact.get);

router.get("/contacts/:id", auth, ctrlContact.getById);

router.post("/contacts", auth, ctrlContact.create);

router.put("/contacts/:id", auth, ctrlContact.update);

router.delete("/contacts/:id", auth, ctrlContact.remove);

router.patch("/contacts/:id/favorite", auth, ctrlContact.updateFavorite);

module.exports = router;
