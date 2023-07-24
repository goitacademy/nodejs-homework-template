import express from "express";
import contactsController from "../../controller/contact-controller";

// import isValidId from "../../middlewars/isValidId.js";


const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll );

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post("/", contactsController.add);

contactsRouter.delete("/:id", contactsController.deleteById);

contactsRouter.put("/:id", contactsController.updateById);

contactsRouter.patch("/:id/favorite", contactsController.updateByIdFavorite);

export default contactsRouter;
