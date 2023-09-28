const express = require("express");

const router = express.Router();

const schema = require("../../utilits/validation");
const validateBody = require("../../middlewares/validateBody");
const ctrl = require("../../controlers/contacts");

router.get("/", ctrl.getList);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.postSchema), ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(schema.putSchema), ctrl.update);

module.exports = router;
