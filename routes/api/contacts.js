const express = require("express");
const Controller = require("../../controller/controller");

const router = express.Router();

router.get("/", Controller.get);

router.get("/:contactId", Controller.getById);

router.post("/", Controller.create);

router.delete("/:contactId", Controller.remove);

router.put("/:contactId", Controller.update);

router.patch("/:contactId/favorite", Controller.upStatus);

module.exports = router;
