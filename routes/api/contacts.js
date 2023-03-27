const express = require("express");

const { auth } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../helpers");
const { schemas, addSchema, updateStatusSchema } = require("../../models/contact");

const validateMiddleware = validation(schemas.addSchema);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.get));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.create));

router.put("/:id", auth, validateMiddleware, ctrlWrapper(ctrl.update));

router.patch(
  "/:id/favorite",
  auth,
  validation(schemas.updateStatusSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", auth, ctrlWrapper(ctrl.remove));

module.exports = router;
