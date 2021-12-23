import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";

const routerDeleteContact = new Router();

routerDeleteContact.delete(
  "/:id",
  middleware.validateId,
  async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactsApp.removeContact(id);
    if (contact) {
      console.log(
        "🚀 ~ file: contacts.js ~ line 29 ~ router.delete ~ contact",
        contact
      );
      return res.status(200).json({ contact });
    }
    res.status(404).json({ message: "Not found" });
  }
);
export default routerDeleteContact;
