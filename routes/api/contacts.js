import express from "express";
import moviesController from "../../controllers/contact-controller.js";
import contactValidation from "../../middleware/validation/contact-validation.js";

const router = express.Router();

router.get("/", moviesController.getAll);

router.get("/:contactId", moviesController.getById);

router.post("/", contactValidation, moviesController.add);

router.delete("/:contactId", moviesController.removeById);

router.put("/:contactId", contactValidation, moviesController.updateById);

export default router;
