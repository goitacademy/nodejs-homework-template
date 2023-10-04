const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const DB_PATH = path.join(__dirname, "../../db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function getById(id) {
  const data = await listContacts();
  const [contact] = data.filter((item) => item.id === id);
  return contact;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  console.log(typeof(data));
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  data.push(newContact);
  await fs.writeFile(DB_PATH, JSON.stringify(data, "", 2));
  return newContact;
}

async function removeContact(id) {
  const data = await listContacts(); 
  const contacts = data.filter((item) => item.id !== id);
  await fs.writeFile(DB_PATH, JSON.stringify(contacts, "", 2));
  return {"message": "contact deleted"};
}

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json({
      status: "ok",
      code: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    }

    res.json({
      status: "ok",
      code: 200,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ "status": "Error", "message": error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    console.log(name === true);
    console.log(email === true);
    console.log(phone === true);
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required field" });
      return 1;
    }
    const newContact = await addContact(req.body);
    res.json({
      status: "created",
      code: 201,
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ "status": "Error", "message": error });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    }

    const isRemoved = await removeContact(contactId);

    console.log(isRemoved === true);
    if(isRemoved) {
      res.json({
        "status":"success",
        "code": 200,
        ...isRemoved 
      });
    }
    
  } catch (error) {
    res.status(500).json({ "status": "Error", "message": error });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    }

    res.json({
      status: "ok",
      code: 200,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ "status": "Error", "message": error });
  }
});

module.exports = router;
