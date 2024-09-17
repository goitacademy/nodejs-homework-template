const contactOperation = require("../../models/contacts");
const listContacts = async (req, res, next) => {
  const contacts = await contactOperation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
