const fs = require("fs").promises;
const filePath = require("./filePath");
const { v4: uuidv4 } = require("uuid");
const getAll = require("./getAll");

const add = async (body) => {
  const contactList = await getAll();
  const newContact = { ...body, id: uuidv4() };
  contactList.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contactList));
  return newContact;
};

module.exports = add;
