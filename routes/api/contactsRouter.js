const express = require("express");
const router = express.Router();

const { controllers: ctrl } = require("../../controllers");
const { asyncWrapper } = require("../../helpers");
const { auth, validation } = require("../../middlewares");
const {
  postSchema,
  putSchema,
  patchSchema,
} = require("../../models/contact.js");

router.get("/", auth, asyncWrapper(ctrl.getAll));

router.get("/:id", asyncWrapper(ctrl.getById));

router.post("/", auth, validation(postSchema), asyncWrapper(ctrl.add));

router.delete("/:id", asyncWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  validation(patchSchema),
  asyncWrapper(ctrl.updateStatusById)
);

router.put("/:id", validation(putSchema), asyncWrapper(ctrl.updateById));

module.exports = { contactsRouter: router };
