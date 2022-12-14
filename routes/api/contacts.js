const express = require("express");
const contacts = require("./contacts");
const nanoid = require("nanoid");
const Joi = require("joi");

const router = express.Router();
const contactsList = contacts.listContacts();

router.get("/", async (req, res, next) => {
  // викликає функцію listContacts
  res.json({ contactsList, status: "success" });
});
// app.get( "way", callback) коли прийде запит за цією адресою - зроби ''це''
// якщо нема потрібної лінки, то кеннот гет ''лінк''
// респонс.дсон - для відправляння джсону
router.get("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const myContact = contacts.getById(id);
  if (!myContact) res.json({ message: "Not found", status: 404 });
  // викликає функцію getById
  res.json({ data: myContact, status: 200 });
});

router.post("/", async (req, res, next) => {
  const id = nanoid();
  const { name, email, phone } = req.body;
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email(
      {
        minDomainSegments: 2,
        tlds: {
          allow: ["com", "net"],
        },
      }.required()
    ),
    phone: Joi
      .string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
  }).with("name", "email", "phone");

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return req.json({"status": validationResult.error})
  }
  contacts.push({ id: id.toString(), name, email, phone });
  res.json({ status: "success" });
});

router.delete("/:contactId", async (req, res, next) => {
  // Викликає функцію removeContact
  // bool = removeContact( req.params)
  // if(bool){
  // res.json({ "message": "contact deleted", "status": 200 });
  // } else {
  // res.json({ message: "Not found", status: 404 });
  // }
  // const contacts = contactsList.filter((it) => it.id !== req.params);
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) {
    res.json({ message: "missing fields", status: 400 });
  }
  const { name, email, phone } = req.body;
  // bool = updateContact(contactId, body)
  // if(bool){
  // res.json({ "status": 200 });
  // } else {
  // res.json({ message: "Not found", status: 404 });
  // }
  contacts.forEach((item) => {
    if (item.id === req.params.id) {
      item.name = name;
      item.email = email;
      item.phone = phone;
    }
  });
});

module.exports = router;
