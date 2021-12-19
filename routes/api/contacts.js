import { Router } from "express";
import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";

const router = new Router();

router.get("/", async (_req, res, _next) => {
  const contacts = await contactsApp.listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", middleware.validateId, async (req, res, _next) => {
  const { id } = req.params;
  const contact = await contactsApp.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", middleware.validateCreate, async (req, res, _next) => {
  const newContact = await contactsApp.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:id", middleware.validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsApp.removeContact(id);
  if (contact) {
    console.log(
      "🚀 ~ file: contacts.js ~ line 29 ~ router.delete ~ contact",
      contact
    );
    return res.status(200).json({ message: "Contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

router.put(
  "/:id",
  middleware.validateId,
  middleware.validateUpdate,
  async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactsApp.updateContact(id, req.body);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  }
);

export default router;
