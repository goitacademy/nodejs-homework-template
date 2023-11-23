const express = require("express");

const ctrl = require("../../controllers/contactsController"); // ctrl - controllers

const { validateBody } = require("../../middlewares");
const addContactShema = require("../../schemas/contactSchema.js");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(addContactShema), ctrl.create);

router.delete("/:id", ctrl.removeById);

router.put("/:id", validateBody(addContactShema), ctrl.updateById);

module.exports = router;
