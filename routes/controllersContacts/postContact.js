import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
import { HttpCode } from "../../lib/constants";

const routerPostContact = new Router();
routerPostContact.post(
  "/",
  middleware.validateCreate,
  async (req, res, _next) => {
    const newContact = await contactsApp.addContact(req.body);
    res
      .status(HttpCode.CREATED)
      .json({
        status: "success",
        code: HttpCode.OK,
        data: { contact: newContact },
      });
  }
);
export default routerPostContact;
