<<<<<<< HEAD
const { Contact } = require("../../models/contacts");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
=======
const contactsOperations = require("../../models/contacts");


const addContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body);
>>>>>>> 2e7b20b03c67d57065d0ce30119fda3b69001c54
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
<<<<<<< HEAD
};

module.exports = addContact;
=======
}

module.exports = addContact;

  
>>>>>>> 2e7b20b03c67d57065d0ce30119fda3b69001c54
