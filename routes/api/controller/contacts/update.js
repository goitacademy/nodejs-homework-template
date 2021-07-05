const fs = require("fs").promises;
const path = require("path");
const contactSchema = require("../../../../utils/validate/chema/prodactSchema");

const contactsPath = path.basename(
  "C:/Users/yarik/Documents/GitHub/Node.js/nodejs-homework-rest-api/contacts.json"
);

const update = async (req, res) => {
  const { contactId } = req.params;
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
    return;
  }

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

  contacts[index] = { id: contactId, ...req.body };

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts),
    "utf8",
    (error) => {
      if (error) {
        console.log(error.message);
      }
    }
  );

  await res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts[index],
    },
  });
};

module.exports = update;
