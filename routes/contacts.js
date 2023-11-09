const express = require("express");

const router = express.Router();

const Controller = require("../controllers/controller");

router.get("/", Controller.getContacts);

router.get("/:id");

router.post("/:id");

router.put("/:id");

router.patch("/id");

router.delete("/:id");

module.exports = router;
