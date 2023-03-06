const express = require("express");
const path = require("path");
const router = express.Router();

const contactsFuncPath = path.resolve("models/contacts.js");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require(contactsFuncPath);

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    console.log("contacts: ", contacts);

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactById = await getContactById(contactId);

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        contactById,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;

    const { name, email, phone } = body;

    if (!name & !email & !phone) {
      return res.status(400).json({ message: "missing fields" });
    }

    await addContact(body);

    res.status(201).json({
      message: `New contact has been created!`,
      status: "success",
      code: "201",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(200).json({
      message: `Contact with id:${contactId} has been removed!`,
      status: "success",
      code: "200",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    if (!contactId) {
      return res.status(400).json({ message: "missing id" });
    }

    const { name, email, phone } = body;

    if (!name & !email & !phone) {
      return res.status(400).json({ message: "missing fields" });
    }

    await updateContact(contactId, body);

    res.status(200).json({
      message: `Contact with id:${contactId} has been updated!`,
      status: "success",
      code: "200",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;

// {
//   "name": "Walter Maier",
//   "email": "catcher@mail.com",
//   "phone": "(123) 456-789"
// }
