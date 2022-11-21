// const fs = require("fs/promises");
// const path = require("path");
// const Joi = require("joi");
// const contactsPath = path.resolve("./models/contacts.json");
const service = require("../service/index");

// const { Contact } = require("../schemas/contactSchema");

const listContacts = async (res) => {
  const results = await service.getAllContacts();
  res.status(200).json(results);
};

const getContactById = async (contactId, res) => {
  const results = await service.getContactById(contactId);
  res.status(200).json(results);
};

const removeContact = async (contactId, res) => {
  try {
    const results = await service.removeContact(contactId);
    if (!results) res.status(404).json({ message: "Not found" });
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  // return listContacts()
  //   .then((data) => {
  //     const contactsListWithoutRemovedContact = data.filter(
  //       (contact) => contact.id !== contactId.toString()
  //     );
  //     if (contactsListWithoutRemovedContact.length === data.length) {
  //       return false;
  //     }
  //     fs.writeFile(
  //       `${contactsPath}`,
  //       JSON.stringify(contactsListWithoutRemovedContact)
  //     );
  //     return true;
  //   })
  //   .catch((err) => console.log(err.message));
};

const addContact = async (req, res) => {
  try {
    const results = await service.createContact(req.body);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // const schema = Joi.object({
  //   name: Joi.string().alphanum().min(3).max(20).required(),
  //   email: Joi.string()
  //     .email({
  //       minDomainSegments: 2,
  //       tlds: { allow: ["com", "net"] },
  //     })
  //     .required(),
  //   phone: Joi.string()
  //     .length(10)
  //     .pattern(/^[0-9]+$/)
  //     .required(),
  // });
  // const { name, email, phone } = body;
  // const bodyIsValid = schema.validate({
  //   name: name,
  //   email: email,
  //   phone: phone,
  // });
  // if (bodyIsValid.error) {
  //   return bodyIsValid.error.message;
  // }
  // const newContact = {
  //   id: getRandomIntInclusive(1, 100).toString(),
  //   name,
  //   email,
  //   phone,
  // };
  // return listContacts()
  //   .then((data) => {
  //     data.push(newContact);
  //     fs.writeFile(`${contactsPath}`, JSON.stringify(data));
  //     return newContact;
  //   })
  //   .catch((err) => console.log(err.message));
};

const updateContact = async (contactId, body) => {
  try {
    const results = await service.updateContact(contactId);
    if (!results) res.status(404).json({ message: "Not found" });
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  // const schema = Joi.object({
  //   name: Joi.string().alphanum().min(3).max(20),
  //   email: Joi.string().email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ["com", "net"] },
  //   }),
  //   phone: Joi.string()
  //     .length(10)
  //     .pattern(/^[0-9]+$/),
  // });
  // const { name, email, phone } = body;
  // const bodyIsValid = schema.validate({
  //   name: name,
  //   email: email,
  //   phone: phone,
  // });
  // return listContacts().then((data) => {
  //   const indexOfContact = data.indexOf(
  //     data.find((contact) => contact.id === contactId.toString())
  //   );
  //   if (indexOfContact === -1) {
  //     return 404;
  //   }
  //   if (bodyIsValid.error) {
  //     return bodyIsValid.error.message;
  //   }
  //   if (name) {
  //     data[indexOfContact].name = name;
  //   }
  //   if (email) {
  //     data[indexOfContact].email = email;
  //   }
  //   if (phone) {
  //     data[indexOfContact].phone = phone;
  //   }
  //   fs.writeFile(`${contactsPath}`, JSON.stringify(data));
  //   return data[indexOfContact];
  // });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
