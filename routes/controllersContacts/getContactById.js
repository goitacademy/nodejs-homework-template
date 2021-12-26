import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
import { HttpCode } from "../../lib/constants";

const routerGetContactById = new Router();
routerGetContactById.get(
  "/:id",
  middleware.validateId,
  async (req, res, _next) => {
    const { id } = req.params;
    const contact = await contactsApp.getContactById(id);
    console.log(contact);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Not found",
      });
  }
);
export default routerGetContactById;
