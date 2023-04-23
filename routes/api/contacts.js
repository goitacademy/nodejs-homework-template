const express = require("express");
const router = express.Router();

router.get("/");

router.get("/:contactId");

router.post("/");

router.delete("/:contactId");

router.put("/:contactId");

module.exports = router;
