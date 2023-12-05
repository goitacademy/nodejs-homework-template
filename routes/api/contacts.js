// import contactService from "../../models/contacts.js";
import contactController from "../../controllers/contact-controller.js";
import express from "express";
import { isEmptyBody } from "../../middlewares/index.js";
import isValid from "../../middlewares/isValidId.js";
import {validateBody} from "../../decorators/index.js";
import {
  contactAddSchema,
  updateScheme,
  movieFavoriteScheme
} from "../../models/Contact.js";

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", isValid, contactController.getByID);

// ???
router.post("/", isEmptyBody, validateBody(contactAddSchema), contactController.addNewContact);
// 


// router.delete("/:contactId", contactController.deleteById);

router.put("/:contactId", isValid, validateBody(updateScheme), contactController.updateById);

router.patch("/:contactId/favorite", isEmptyBody, isValid, validateBody(movieFavoriteScheme), contactController.updateById );


export default router;
