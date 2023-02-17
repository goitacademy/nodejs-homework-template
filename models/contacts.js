const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../models/contacts.json");
const { nanoid } = require("nanoid");
const Joi = require("joi");
const { status, readDB } = require("../helpers/status");

const listContacts = async (req, res, next) => {
 try {
  const result = await readDB();
  return status(res, 200, { status: "success" }, result);
 } catch (arror) {
  console.error("внешний блок catch", arror.message);
 }
};

const getContactById = async (req, res, next) => {
 try {
  const result = await readDB();
  const [contact] = result.filter((item) => item.id === req.params.contactId);
  if (contact) {
   return status(res, 200, { status: "success" }, contact);
  } else {
   return status(res, 200, { status: "error", message: "Not found" }, contact);
  }
 } catch (error) {
  console.error(error);
 }
};

const removeContact = async (req, res, next) => {
 try {
  const result = await readDB();
  const resultFilter = result.filter(
   (item) => item.id !== req.params.contactId
  );
  if (resultFilter) {
   const newResuit = [...resultFilter];

   await fs.writeFile(contactsPath, JSON.stringify(newResuit), "utf-8");
   return status(res, 200, { message: "contact deleted" });
  } else {
   return status(res, 404, { message: "Not found" });
  }
 } catch (error) {
  console.error(error);
 }
};

const addContact = async (req, res, next) => {
 try {
  const schema = Joi.object({
   name: Joi.string().alphanum().min(3).max(10).required(),
   email: Joi.string()
    .email({
     minDomainSegments: 2,
     tlds: { allow: ["com", "net"] },
    })
    .required(),
   phone: Joi.string().alphanum().min(4).max(10).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
   return status(res, 400, {
    message: "missing required name field",
    status: validationResult.error,
   });
  } else {
   const { name, email, phone } = req.body;

   const contact = {
    id: nanoid(),
    name,
    email,
    phone,
   };

   const result = await readDB();
   const newResuit = [...result, contact];
   await fs.writeFile(contactsPath, JSON.stringify(newResuit), "utf-8");
   const newResult = await readDB();
   return status(res, 201, { status: "success" }, newResult);
  }
 } catch (error) {
  console.error(error);
 }
};

const updateContact = async (req, res, next) => {
 try {
  const result = await readDB();
  const schema = Joi.object({
   name: Joi.string().alphanum().min(3).max(10).required(),

   email: Joi.string()
    .email({
     minDomainSegments: 2,
     tlds: { allow: ["com", "net"] },
    })
    .required(),

   phone: Joi.string().alphanum().min(4).max(10).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
   return status(res, 400, {
    message: "Not found",
    status: validationResult.error,
   });
  } else {
   const { name, email, phone } = req.body;

   result.forEach((contact) => {
    if (contact.id === req.params.contactId) {
     contact.name = name;
     contact.email = email;
     contact.phone = phone;
    }
   });
   await fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");
   return status(res, 200, { status: "success", result });
  }
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
