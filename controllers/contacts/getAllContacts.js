const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next ) => {
  const contacts = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAllContacts;
