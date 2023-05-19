const { Contact } = require("../../models");

const getContactsList = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: "Success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getContactsList;
