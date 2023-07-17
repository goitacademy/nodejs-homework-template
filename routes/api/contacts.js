// const express = require("express");
// const router = express.Router();
// const contacts = require("../../models/contacts.json");
// const { v4: uuidv4 } = require("uuid");
// const fs = require("fs");
// const { createContactSchema, updateContactSchema } = require("./validators");

// router.get("/", (req, res) => {
//   res.json(contacts);
// });

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const contact = contacts.find((c) => c.id === id);
//   if (contact) {
//     res.json(contact);
//   } else {
//     res.status(404).json({ message: "Not found" });
//   }
// });

// router.post("/", (req, res) => {
//   const { name, email, phone } = req.body;
//   const { error } = createContactSchema.validate(req.body);
//   if (error) {
//     res.status(400).json({ message: error.details[0].message });
//   } else {
//     const newContact = {
//       id: uuidv4(),
//       name,
//       email,
//       phone,
//     };
//     contacts.push(newContact);
//     updateContactsFile();
//     res.status(201).json(newContact);
//   }
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const index = contacts.findIndex((c) => c.id === id);
//   if (index !== -1) {
//     contacts.splice(index, 1);
//     updateContactsFile();
//     res.json({ message: "Contact deleted" });
//   } else {
//     res.status(404).json({ message: "Not found" });
//   }
// });

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, email, phone } = req.body;
//   const { error } = updateContactSchema.validate(req.body);
//   if (error) {
//     res.status(400).json({ message: error.details[0].message });
//   } else {
//     const contact = contacts.find((c) => c.id === id);
//     if (contact) {
//       contact.name = name || contact.name;
//       if (email) contact.email = email;
//       if (phone) contact.phone = phone;
//       updateContactsFile();
//       res.json(contact);
//     } else {
//       res.status(404).json({ message: "Not found" });
//     }
//   }
// });

// function updateContactsFile() {
//   fs.writeFileSync("contacts.json", JSON.stringify(contacts));
// }

// module.exports = router;

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { createContactSchema, updateContactSchema } = require("./validators");
const Contact = require("../../models/contacts");

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      const newContact = new Contact({
        id: uuidv4(),
        name,
        email,
        phone,
      });
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (deletedContact) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      const contact = await Contact.findById(id);
      if (contact) {
        contact.name = name || contact.name;
        if (email) contact.email = email;
        if (phone) contact.phone = phone;
        await contact.save();
        res.json(contact);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field 'favorite'" });
  }

  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      contact.favorite = favorite;
      await contact.save();
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
