const express = require("express");
const { getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateStatusContact } = require("../../controllers/contacts/index");
const { isEmptyBody } = require("../../middlewares/index");
const { isValidId } = require("../../middlewares/index");
const { authenticate } = require("../../middlewares/index");
const { ctrlWrapper } = require("../../decorators/index");

const router = express.Router();
const { validateBody } = require("../../decorators/index");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../schemas/contact-schemas");

router.use(authenticate);

router.get("/", ctrlWrapper(getAll));

router.get("/:id", isValidId, ctrlWrapper(getById));

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  ctrlWrapper(add)
);

router.delete("/:id", isValidId, ctrlWrapper(deleteById));

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactAddSchema),
  ctrlWrapper(updateById)
);

router.patch(
  "/:id/favorite",
  validateBody(contactUpdateFavoriteSchema),
  isValidId, 
  isEmptyBody,  
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
