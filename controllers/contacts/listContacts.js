// const contactsOperations = require("../../models/contactsFunctions");
const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  // const contacts = await contactsOperations.listContacts();
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
