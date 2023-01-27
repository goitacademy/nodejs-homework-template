const fs = require("fs").promises;
const filePath = require("./filePath");
const getAll = require("./getAll");

const updateById = async (id, body) => {
  const contactList = await getAll();
  const index = contactList.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  contactList[index] = { id, ...body };
  await fs.writeFile(filePath, JSON.stringify(contactList));
  return contactList[index];
};

module.exports = updateById;
