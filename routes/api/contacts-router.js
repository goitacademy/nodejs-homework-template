import express from "express";

import controllers from "../../controllers/contacts-controllers.js";

import { isValidId, isEmptyBody } from "../../middlewars/index.js";

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post("/", isEmptyBody, controllers.add);

router.put("/:contactId", isValidId, isEmptyBody, controllers.updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  controllers.updateFavorite
);

router.delete("/:contactId", isValidId, controllers.deleteById);

export default router;
