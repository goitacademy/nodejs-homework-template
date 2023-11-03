const express = require("express");
const mode = require("../../controllers/contactMode");
const validateMethod = require("../../middlewares");
const { ValidationSchema, PatchSchema } = require("../../schemas/Validation");

const router = express.Router();

router.get("/", mode.getAll);

router.get("/:contactId", mode.getById);

router.post("/", validateMethod(ValidationSchema), mode.postItem);

router.delete("/:contactId", mode.deleteItem);

router.put("/:contactId", validateMethod(ValidationSchema), mode.putItem);

router.patch("/:contactId", validateMethod(PatchSchema), mode.patchItem);

module.exports = router;
