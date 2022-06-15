const contactsOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  console.log(contacts);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts
    }
  });

}

module.exports = getAll;