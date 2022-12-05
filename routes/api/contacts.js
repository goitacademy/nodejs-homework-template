const express = require("express");
const router = express.Router();
const controlers = require("../../controllers/contacts");

router.get("/", controlers.getAll);

router.get("/:contactId", controlers.getById);

router.post("/", controlers.postNew);

router.delete("/:contactId", controlers.deleteById);

router.put("/:contactId", controlers.putById);

module.exports = router;
