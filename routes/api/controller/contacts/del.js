const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.basename(
  "C:/Users/yarik/Documents/GitHub/Node.js/nodejs-homework-rest-api/contacts.json"
);

const del = async (req, res) => {
  const { contactId } = req.params;

  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = await JSON.parse(file);

  const index = await contacts.findIndex(
    (contact) => contact.id === Number(contactId)
  );
  console.log(index);
  if (!index) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }
  const newContacts = await contacts.filter(
    (contact) => contact.id !== Number(contactId)
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts),
    "utf8",
    (error) => {
      if (error) {
        console.log(error.message);
      }
    }
  );

  await res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: "No content",
    },
  });
};

module.exports = del;
