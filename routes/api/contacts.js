import express from "express";
import contactsController from "../../controllers/mivies-controllers.js";
import authenticate from "../../middleware/authenticate.js";
import isValidId from "../../middleware/isValidId.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", contactsController.add);

router.delete("/:contactId", isValidId, contactsController.delleteById);

router.put("/:contactId", isValidId, contactsController.updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactsController.updateFavorite
);

export default router;
