const res = require("express/lib/response");
const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const getContucts = JSON.parse(data);
  return getContucts;
};

const getContactById = async (id) => {
  const contuctsById = await listContacts();
  const result = contuctsById.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (id) => {

   const contacty = await listContacts();
   const idx = contacty.findIndex((item) => item.id === id);
   if (idx === -1) {
     return null;
   }
   const deleteContact = contacty[idx];
  contacty.splice(idx, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacty, null, 2));
   return deleteContact;

};

const addContact = async (name, email, phone) => {
  const data = { id: v4(), name, email, phone };
  const contuctsPost = await listContacts();
  contuctsPost.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contuctsPost, null, 2));
  return data;
};

const updateContact = async (id, name, email, phone) => {
  const updateById = await listContacts();
  const idx = updateById.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
    updateById[idx] = { id, name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(updateById, null, 2));
    return updateById[idx];
  
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
