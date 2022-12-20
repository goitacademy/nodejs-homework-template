const express = require("express");

const { schema } = require("../../schemas");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const validateMiddlewarePut = validation(schema.putSchema);
const validateMiddlewarePost = validation(schema.postSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddlewarePost, ctrlWrapper(ctrl.postContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put("/:contactId", validateMiddlewarePut, ctrlWrapper(ctrl.putContact));

module.exports = router;
