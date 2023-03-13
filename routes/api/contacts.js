const express = require("express");
const controllers = require("../../controller/contacts");
const { ctrlWrapper } = require("../../helpers/index");
const { validateBody, authenticate } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../schema/contacts");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(controllers.getAll));

router.post(
  "/",
  authenticate,
  validateBody(addSchema),
  upload.single("avatar"),
  ctrlWrapper(controllers.add)
);

router.get("/:contactId", authenticate, ctrlWrapper(controllers.getById));

router.delete("/:contactId", authenticate, ctrlWrapper(controllers.deleteById));

router.put(
  "/:contactId",
  authenticate,
  validateBody(updateSchema),
  ctrlWrapper(controllers.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(controllers.updateStatusContact)
);

module.exports = router;
