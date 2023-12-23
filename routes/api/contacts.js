const express = require("express");
const router = express.Router();
const control = require("../../controlers/control");
//======================getAll==========================
router.get("/", control.getAll);
//========================getID========================
router.get("/:contactId", control.getID);
//=======================post=========================
router.post("/", control.post);
//=======================delete=========================
router.delete("/:contactId", control.delet);
//========================put========================
router.put("/:contactId", control.put);

module.exports = router;
