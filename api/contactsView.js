//aqui van los routers, que seria equivalente a la vista
const express = require("express");
const router = express.Router();
const ctrlContact = require("../controllers/contactController");

router.get("/", ctrlContact.get);

router.get("/:id", ctrlContact.getById);

router.post("/", ctrlContact.create);

router.put("/:id", ctrlContact.update);

router.patch("/:id/favorite", ctrlContact.updateFavorite);

router.delete("/:id", ctrlContact.remove);


module.exports = router;