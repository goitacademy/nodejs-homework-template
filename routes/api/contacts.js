// const fs = require("fs/promises");
const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts, status: "200" });
 
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.json({ message: "Not found", status: "404" });
  }
  res.json({ contact, status: "200" });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  
  const newContacts = await addContact(req.body);
  if (!name || !email || !phone) {
    res.json({ message: "missing required name field", status: "400" });
  } else {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().min(6).max(10).required(),
  });
  const validRezalt = schema.validate(req.body);
  if (validRezalt.error) {
    res.json({ message: validRezalt.error, status: "400" });
  }else(res.json({ newContacts, status: "201" }))


    
  }
});



router.delete("/:contactId", async (req, res, next) => {
  const contactDelete = await removeContact(req.params.contactId);
  if (!contactDelete) {
    res.json({ message: "Not found", status: "404" });
  } else {
    res.json({ message: "contact deleted", status: "200" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) {
    res.json({ message: "missing fields", status: "404" });
  }
  if (req.body) {
    const updateContacts = await updateContact(req.params.contactId, req.body);
    if (updateContacts) {
        const schema = Joi.object({
          name: Joi.string().alphanum().min(3).max(30),
          email: Joi.string()
            .email({
              minDomainSegments: 2,
              tlds: { allow: ["com", "net"] },
            }),
          phone: Joi.string().min(6).max(10),
        });
      const validRezalt = schema.validate(req.body);
      
        if (validRezalt.error) {
          res.json({ message: validRezalt.error, status: "400" });
      }else( res.json({ updateContacts, status: "200" }))
      
     
    } else res.json({ message: "Not found", status: "404" });
  }
   
});

module.exports = router;
