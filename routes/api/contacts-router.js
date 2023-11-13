import express from "express";
// import contactsService from "../../models/index.js";

// import contactsService from "../../models/index.js";
// import contactController from "../../controllers/contact-controller.js";
import contactController from "../../controllers/contact-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";
const contactsRouter = express.Router();
// const contactsService = require("../../models/index.js");

// contactsRouter.get("/", async (req, res, next) => {
//   const result = await contactsService.listContacts();
//   res.json(result);
// });

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

contactsRouter.get("/", contactController.getAll);

contactsRouter.get("/:id", contactController.getById);

contactsRouter.post("/", isEmptyBody, contactController.add);

contactsRouter.put("/:id", isEmptyBody, contactController.updateById);

contactsRouter.delete("/:id", contactController.deleteById);

export default contactsRouter;
