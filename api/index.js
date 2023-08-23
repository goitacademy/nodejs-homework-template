const express = require("express");
const router = express.Router();
const ctrlContact = require("../controller");

router.get("/contacts", ctrlContact.get);

router.get("/contacts/:id", ctrlContact.getById);

router.post("/contacts", ctrlContact.create);

router.put("/contacts/:id", ctrlContact.update);

router.delete("/contacts/:id", ctrlContact.remove);

router.patch("/contacts/:id/favorite", ctrlContact.updateFavorite);

module.exports = router;
