import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
import { HttpCode } from "../../lib/constants";

const routerPutContact = new Router();
routerPutContact.put(
  "/:id",
  middleware.validateId,
  middleware.validateUpdate,
  async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactsApp.updateContact(id, req.body);
    if (contact) {
      res
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
export default routerPutContact;
