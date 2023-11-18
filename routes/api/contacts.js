import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", isEmptyBody, contactsController.add);

router.delete("/:contactId", isValidId, contactsController.deleteById);

router.put("/:contactId", isValidId, isEmptyBody, contactsController.update);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactsController.updateStatusContact
);

export default router;
