import express from "express";

import * as contactsService from "../../models/contacts/index.js";

import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Movi with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

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
