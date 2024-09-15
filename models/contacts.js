const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");
const Joi = require("joi");
const contactsPath = path.join(__dirname, "/contacts.json");
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
const phoneNumberJoi = Joi.extend(require("joi-phone-number"));

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
};

const getContactById = async (contactId) => {
  const list = await fs.readFile(contactsPath);
  const contact = JSON.parse(list).find((contact) => contact.id === contactId);
  return contact;
};

const addContact = async (body) => {
  const list = await listContacts();
  const { name, email, phone } = body;
  let newContact = null;
  !schema.validate({ name: name, email: email }).error &&
  !phoneNumberJoi.string().phoneNumber().validate(phone).error
    ? (newContact = { id: nanoid(), ...body }) && list.push(newContact)
    : console.log("Something goes wrong");
  console.log(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const index = list.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return false;
  }
  const contactToRemove = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return contactToRemove;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const index = list.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  // ------ Работает с любым одним ключом:свойством ----------
  // list[index][Object.keys(body)] = Object.values(body).toString();
  // ---------Корректно работает только если присутвуют 3 обязательные ключа(name, email, phone):свойства -------
  // list[index] = { id: contactId, ...body };
  // ----------- Работает с любым кол-вом ключей:свойств----------
  for (key in body) {
    switch (key) {
      case "name":
        if (schema.validate({ name: body[key] }).error) {
          console.log(schema.validate({ name: body[key] }).error);
        } else {
          list[index][key] = body[key];
        }
        break;

      case "email":
        if (schema.validate({ email: body[key] }).error) {
          console.log(schema.validate({ email: body[key] }).error);
        } else {
          list[index][key] = body[key];
        }

        break;

      case "phone":
        if (phoneNumberJoi.string().phoneNumber().validate(body[key]).error) {
          console.log(
            phoneNumberJoi.string().phoneNumber().validate(body[key]).error
          );
        } else {
          list[index][key] = body[key];
        }

        break;

      default:
        list[index][key] = body[key];
    }
  }
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
