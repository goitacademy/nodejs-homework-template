import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
import { HttpCode } from "../../lib/constants";
const routerListContacts = new Router();
routerListContacts.get(
  "/",
  middleware.validateQuery,
  async (req, res, _next) => {
    const contacts = await contactsApp.listContacts(req.query);
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
  }
);
export default routerListContacts;
