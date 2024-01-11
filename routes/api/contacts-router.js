import express from "express";
import contactsController from "../../controllers/contacts-controller.js";

const contactsRouter = express.Router();

// contactsRouter.get("/", async (req, res, next) => {
//   const result = await contactsService.listContacts();

//   res.json(result);
// });

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:contactId", contactsController.getById)

// contactsRouter.get("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// contactsRouter.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// contactsRouter.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// contactsRouter.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

export default contactsRouter;
