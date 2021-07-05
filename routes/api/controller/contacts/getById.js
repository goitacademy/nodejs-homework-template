const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.basename(
  "C:/Users/yarik/Documents/GitHub/Node.js/nodejs-homework-rest-api/contacts.json"
);

const getById = async (req, res) => {
  const { contactId } = req.params;
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = await JSON.parse(file);
  const selectContact = await contacts.find(
    (contact) => contact.id === Number(contactId)
  );
  if (!selectContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact with this id not found !",
    });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: selectContact,
    },
  });
};

module.exports = getById;
