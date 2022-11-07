const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../models/contacts.json");
const { nanoid } = require("nanoid");
const Joi = require("joi");

const listContacts = async (req, res, next) => {
 try {
  const result = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  return res.json({ status: "success", result });
 } catch (arror) {
  console.error("внешний блок catch", arror.message);
  // throw arror;
 }
};

const getContactById = async (req, res, next) => {
 try {
  const result = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const [contact] = result.filter((item) => item.id === req.params.contactId);

  res.json({ status: "success", contact });
 } catch (error) {
  console.error(error);
 }
};

const removeContact = async (req, res, next) => {
 try {
  const result = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const resultFilter = result.filter(
   (item) => item.id !== req.params.contactId
  );
  const newResuit = [...resultFilter];
  await fs.writeFile(contactsPath, JSON.stringify(newResuit), "utf-8");
  res.json({ status: "success" });
 } catch (error) {
  console.error(error);
 }
};

const addContact = async (req, res, next) => {
 try {
  const schema = Joi.object({
   name: Joi.string().alphanum().min(3).max(10).required(),

   email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
   }),

   phone: Joi.number().alphanum().min(4).max(10).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
   return res.status(400).json({ status: validationResult.error });
  }
  const { name, email, phone } = req.body;

  const contact = {
   id: nanoid(),
   name,
   email,
   phone,
  };

  const result = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const newResuit = [...result, contact];
  await fs.writeFile(contactsPath, JSON.stringify(newResuit), "utf-8");
  const result2 = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  res.json({ status: "success", result2 });
 } catch (error) {
  console.error(error);
 }
};

const updateContact = async (req, res, next) => {
 try {
  const result = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const { name, email, phone } = req.body;

  result.forEach((contact) => {
   if (contact.id === req.params.contactId) {
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
   }
  });
  await fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");

  res.json({ status: "success", result });
 } catch (error) {
  console.error(error);
 }
};

module.exports = {
 listContacts,
 getContactById,
 removeContact,
 addContact,
 updateContact,
};
