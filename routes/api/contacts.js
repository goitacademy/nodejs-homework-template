import { Router } from "express";
// const contacts = require("../../models/contacts");
import controllers from "../../controllers/books.js";
import {isEmptyBody} from "../../middlewares/index.js";

import { contactAddSchema, contactUpdateSchema } from "../../schemas/contact-schemas.js"
import validateBody from "../../decorators/validateBody.js";

const router = Router();
router.get("/", controllers.getAllContact);

router.get("/:contactId", controllers.getContactById);

router.post("/", isEmptyBody,validateBody(contactAddSchema), controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put("/:contactId", isEmptyBody, validateBody(contactUpdateSchema),controllers.updateContact);

export default router;
