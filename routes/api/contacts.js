import express from "express";
import ctrl from "../../controllers/contacts.js";
import contactSchema from "../../schemas/contacts.js";
import isEmptyReq from "../../middlewares/isEmptyReq.js";
import validateReqBody from "../../middlewares/validateReqBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getContactById);

contactsRouter.post(
  "/",
  isEmptyReq,
  validateReqBody(contactSchema),
  ctrl.addNewContact
);

contactsRouter.delete("/:id", ctrl.deleteContactById);

contactsRouter.put(
  "/:id",
  isEmptyReq,
  validateReqBody(contactSchema),
  ctrl.updateContactById
);
  
export default contactsRouter;