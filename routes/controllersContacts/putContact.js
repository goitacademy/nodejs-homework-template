import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";

const routerPutContact = new Router();
routerPutContact.put(
  "/:id",
  middleware.validateId,
  middleware.validateUpdate,
  async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactsApp.updateContact(id, req.body);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  }
);
export default routerPutContact;
