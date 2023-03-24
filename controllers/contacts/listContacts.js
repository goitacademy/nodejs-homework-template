const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({}, "name email phone favorite");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
