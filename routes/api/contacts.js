const express = require("express");
const router = express.Router();
const contactsCntrl = require("../../controller/contacts");

router.get("/", contactsCntrl.get);

router.get("/:contactId", contactsCntrl.getById);

router.post("/", contactsCntrl.add);

router.delete("/:contactId", contactsCntrl.remove);

router.put("/:contactId", contactsCntrl.update);

router.patch("/:contactId/favorite", contactsCntrl.update);

module.exports = router;
