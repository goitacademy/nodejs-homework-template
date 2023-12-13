import contactController from "../../controllers/contact-controller.js";
import express from "express";
import {
  isEmptyBody,
  isEmptyFavoriteBody,
  isValid,
  authenticate,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  updateScheme,
  movieFavoriteScheme,
} from "../../models/Contact.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactController.getAllContacts);
router.get("/:contactId", isValid, contactController.getByID);
router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.addNewContact
);

router.put(
  "/:contactId",
  isValid,
  isEmptyBody,
  validateBody(updateScheme),
  contactController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValid,
  isEmptyFavoriteBody,
  validateBody(movieFavoriteScheme),
  contactController.updateStatusContact
);

router.delete("/:contactId", isValid, contactController.deleteById);

export default router;
