import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";

const routerGetContactById = new Router();
routerGetContactById.get(
  "/:id",
  middleware.validateId,
  async (req, res, _next) => {
    const { id } = req.params;
    const contact = await contactsApp.getContactById(id);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  }
);
export default routerGetContactById;
