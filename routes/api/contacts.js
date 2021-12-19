import express from "express";

import model from "../../model/index";
import {
  addContactValidation,
  patchingContactValidation,
  idValidation,
} from "./validation";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await model.contactsList();
  res.status(200).json(contacts);
});

router.get("/:id", idValidation, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", addContactValidation, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  if (newContact === null) {
    return res.status(400).json({ message: "missing required name field" });
  }
  res.status(201).json(newContact);
});

router.delete("/:id", idValidation, async (req, res, next) => {
  const { id } = req.params;
  const contacts = await model.removeContact(id);
  if (contacts === null) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
});

router.put(
  "/:id",
  idValidation,
  patchingContactValidation,
  async (req, res, next) => {
    const { id } = req.params;
    const contact = await model.updateContact(id, req.body);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(contact);
  }
);

export default router;
