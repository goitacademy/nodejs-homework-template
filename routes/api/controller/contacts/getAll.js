const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.basename(
  "C:/Users/yarik/Documents/GitHub/Node.js/nodejs-homework-rest-api/contacts.json"
);

const getAll = async (req, res) => {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = await JSON.parse(file);
  await res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
