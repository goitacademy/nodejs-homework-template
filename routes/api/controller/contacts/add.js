const fs = require("fs").promises;
const path = require("path");
const { uuid } = require("uuidv4");
const contactSchema = require("../../../../utils/validate/chema/prodactSchema");
const contactsPath = path.basename(
  "C:/Users/yarik/Documents/GitHub/Node.js/nodejs-homework-rest-api/contacts.json"
);

const add = async (req, res) => {
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
  const newContact = {
    id: uuid(),
    ...req.body,
  };

  contacts.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8", (error) => {
    if (error) {
      console.log(error.message);
    }
  });

  res.json({
    status: "success",
    code: 201,
    data: {
      result: contacts,
    },
  });
};

module.exports = add;
