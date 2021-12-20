import { Router } from "express";
import model from "../../model/contacts/index";

const routerListContacts = new Router();

routerListContacts.get("/", async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
});

export default routerListContacts;
