import { Router } from "express";

import * as contacts from "../../js/contacts.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contactsList,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contacts.getContactById(id);
  contact.length !== 0 &&
    res.json({
      stats: "success",
      code: 200,
      data: {
        ...contact,
      },
    });
  contact.length === 0 &&
    res.json({
      status: "error",
      code: 400,
      message: "Not found",
    });
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.email || !body.phone) {
    const missing = [];
    !body.name && missing.push("name");
    !body.email && missing.push("email");
    !body.phone && missing.push("phone");
    res.json({
      status: "error",
      code: 400,
      message: `Missing fields: ${missing.join(", ")}`,
    });
    return;
  }
  const data = await contacts.addContact(body);
  res.json({
    status: "sucess",
    code: 201,
    data: data,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const deleted = await contacts.removeContact(id);
  deleted
    ? res.json({ status: "success", code: 200, message: "Contact delted" })
    : res.json({ status: "error", code: "404", message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  if (!body) {
    res.json({
      status: "error",
      code: 400,
      message: `Missing fields.`,
    });
    return;
  }
  const data = await contacts.updateContact(id, body);
  res.json({
    status: "sucess",
    code: 201,
    data: data,
  });
});

export default router;
