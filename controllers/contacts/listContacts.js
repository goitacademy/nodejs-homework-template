<<<<<<< HEAD
const { Contact } = require("../../models/contacts");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
=======
const contactsOperations = require("../../models/contacts");

  const listContacts = async (req, res) => {
    const contacts = await contactsOperations.listContacts();
      res.json({
        status: "success",
        code: 200,
        data: {
          result: contacts,
        },
      });
};

  module.exports = listContacts;

  
>>>>>>> 2e7b20b03c67d57065d0ce30119fda3b69001c54
