const express = require("express");
const router = express.Router();

const { controllers: ctrl } = require("../../controllers");
const {
  auth,
  validation,
  asyncWrapper,
  isValidId,
} = require("../../middlewares");
const { joiPostSchema, joiPutSchema, joiPatchSchema } = require("../../models");

router.get("/", auth, asyncWrapper(ctrl.getAll));

router.get("/:id", auth, isValidId, asyncWrapper(ctrl.getById));

router.post("/", auth, validation(joiPostSchema), asyncWrapper(ctrl.add));

router.delete("/:id", auth, isValidId, asyncWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  auth,
  isValidId,
  validation(joiPatchSchema),
  asyncWrapper(ctrl.updateStatusById)
);

router.put(
  "/:id",
  auth,
  validation(joiPutSchema),
  asyncWrapper(ctrl.updateById)
);

module.exports = { contactsRouter: router };
