const express = require("express");

const router = express.Router();

const cntrl = require("../../controllers/contacts");
const { cntrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", cntrlWrapper(cntrl.getAll));

router.get("/:id", isValidId, cntrlWrapper(cntrl.getById));

router.post("/", validateBody(schemas.postSchema), cntrlWrapper(cntrl.add));

router.delete("/:id", isValidId, cntrlWrapper(cntrl.remove));

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.putSchema),
  cntrlWrapper(cntrl.update)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchemas),
  cntrlWrapper(cntrl.updateFavorite)
);

module.exports = router;
//npm run start:dev
