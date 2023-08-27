const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { contacts: ctrl } = require("../../controllers");
const {
  validateSchema,
  validateContactId,
  authenticateToken,
} = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get(
  "/",
  authenticateToken,
  asyncHandler(async (req, res, next) => {
    await ctrl.getAll(req, res, next);
  })
);

router.get(
  "/:contactId",
  validateContactId,
  asyncHandler(async (req, res, next) => {
    await ctrl.getById(req, res, next);
  })
);

router.post(
  "/",
  authenticateToken,
  validateSchema(schemas.addSchema),
  asyncHandler(async (req, res, next) => {
    await ctrl.add(req, res, next);
  })
);

router.delete(
  "/:contactId",
  validateContactId,
  asyncHandler(async (req, res, next) => {
    await ctrl.removeById(req, res, next);
  })
);

router.put(
  "/:contactId",
  validateContactId,
  validateSchema(schemas.addSchema),
  asyncHandler(async (req, res, next) => {
    await ctrl.update(req, res, next);
  })
);

router.patch(
  "/:contactId/favorite",
  validateContactId,
  validateSchema(schemas.updateFavoriteSchema),
  asyncHandler(async (req, res, next) => {
    await ctrl.updateFavorite(req, res, next);
  })
);

module.exports = router;
