import express from "express";
import contactControllers from "../../controllers/contacts-controller.js";
import authenticate from "../../middleware/validation/authenticate.js";
import { contactValidate } from "../../middleware/validation/validation.js";
import { upload } from "../../middleware/validation/upload.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactControllers.getAll);

router.get("/:contactId", contactControllers.getById);

router.post(
  "/",
  upload.single("avatar"),
  contactValidate,
  contactControllers.add
);

router.delete("/:contactId", contactControllers.deleteById);

router.put("/:contactId", contactValidate, contactControllers.updateById);

router.patch(
  "/:contactId/favorite",
  contactValidate,
  contactControllers.favorite
);

export default router;
