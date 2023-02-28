const express = require("express");

const router = express.Router();

const contactOperations = require("../../models/contacts.js");

const {
  listContacts,
  addContact,
  removeContact,
  updateContact,
  getContactById,
} = contactOperations;
console.log(listContacts);
console.log(addContact);
console.log(removeContact);
console.log(updateContact);
console.log(getContactById);

// const Joi = require("joi");

// const schema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net", "org"] },
//   }),
//   phone: Joi.string(),
// });

router.get("/contacts", async (req, res, next) => {
  res.send("Это главный роутер");
  const contacts = await listContacts();
  res.json({
    status: 200,
    data: {
      contacts,
    },
  });
});

router.get("/contacts/:id", async (req, res, next) => {
  const contactId = req.params.id;
  console.log("ID=", contactId);
  res.send("Это роутер контакта c ID=" + contactId);
  if (!contactId) {
    return () => {
      console.log("Contact not found");
      res.status(404).json({
        message: "Not found",
        status: 404,
      });
      next();
    };
  } else {
    const contact = await getContactById(contactId);
    console.log(contact);
    res.json({
      status: 200,
      data: {
        contact,
      },
    });
  }
});

router.post("/contacts", async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    // const value = await schema.validateAsync({ name, email, phone });
    // console.log(value);
    const contacts = await addContact(name, email, phone);
    console.log(contacts);
    res.status(200).json({
      status: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.log("Some bug happened");
    console.log(error.message);
  }
});

router.delete("/contacts/:id", async (req, res, next) => {
  const contactId = req.params.id;
  if (!contactId) {
    return () => {
      res.json({
        message: "Not found",
        status: 404,
      });
      next();
    };
  } else {
    const contacts = await removeContact(contactId);
    res.json({
      message: "contact deleted",
      status: 200,
      data: {
        contacts,
      },
    });
  }
});

router.put("/contacts/:id", async (req, res, next) => {
  const contactId = req.params.id;
  const { name, email, phone } = req.body;

  if (!req.body) {
    res.status(400).json({
      status: 400,
      message: "missing fields",
    });
  } else if (contactId) {
    try {
      // const value = await schema.validateAsync({ name, email, phone });
      const contacts = await updateContact(contactId, { name, email, phone });
      res.status(200).json({
        status: 200,
        data: {
          contacts,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(404).json({
      status: 404,
      message: "Not found",
    });
  }
});

module.exports = router;
