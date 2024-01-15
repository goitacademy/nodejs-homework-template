import { Router } from "express";

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
  const val = schemaReq.validate(body);
  if (val.error) {
    res.json({
      status: "error",
      code: 400,
      message: val.error.message,
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
    ? res.json({ status: "success", code: 200, message: "Contact deleted" })
    : res.json({ status: "error", code: "404", message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  const val = schema.validate(body);
  if (val.error) {
    res.json({
      status: "error",
      code: 400,
      message: val.error.message,
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
