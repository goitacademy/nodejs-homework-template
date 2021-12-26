import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
import { HttpCode } from "../../lib/constants";

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
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }
);
export default routerDeleteContact;
