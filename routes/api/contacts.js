import express from "express";
import contactControllers from "../../controllers/contacts-controller.js";
import contactValidate from "../../middleware/validation/movie-validation.js";

const router = express.Router();

router.get("/", contactControllers.getAll);

router.get("/:contactId", contactControllers.getById);

router.post("/", contactValidate, contactControllers.add);

router.delete("/:contactId", contactControllers.deleteById);

router.put("/:contactId", contactValidate, contactControllers.updateById);

router.patch(
  "/:contactId/favorite",
  contactValidate,
  contactControllers.favorite
);

export default router;
