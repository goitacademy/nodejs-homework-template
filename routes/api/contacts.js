const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await listContacts();
  return res.status(200).json({ message: response });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const response = await getContactById(id);
  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: JSON.parse(response) });
});

router.post("/", async (req, res, next) => {
  const keys = Object.keys(req.body);
  try {
    const response = await addContact(req.body);
    if (req.body.id.toString() === JSON.parse(response).toString()) {
      return res.status(404).json({
        message: `Contact of id ${req.body.id} is already in database`,
      });
    }
    const rawElement = response.slice(1, response.length - 1);
    const missingElement = keys.find((el) => el === rawElement);
    if (missingElement) {
      return res
        .status(400)
        .json({ message: `Something wrong with "${missingElement}" field` });
    }
    return res.status(201).json({
      message: `succesfully posted user id ${JSON.parse(response).id}`,
    });
  } catch {
    return res.status(404).send();
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    await removeContact(id);
    return res.status(200).json({ message: `Contact with id ${id} deleted` });
  } catch {
    return res.status(404).json({ message: "Not found!" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields!" });
  }
  try {
    const response = await updateContact(req.params.contactId, req.body);
    return res.status(200).json({ message: response });
  } catch {
    return res.status(404).json({ message: "Not found!" });
  }
});

module.exports = router;
