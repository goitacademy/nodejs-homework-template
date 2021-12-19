import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";

const routerPostContact = new Router();
routerPostContact.post(
  "/",
  middleware.validateCreate,
  async (req, res, _next) => {
    const newContact = await contactsApp.addContact(req.body);
    res.status(201).json(newContact);
  }
);
export default routerPostContact;
