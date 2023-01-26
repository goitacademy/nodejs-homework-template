const Contact = require("../../models/contact");

const getAll = async (_, res) => {
  const contacts = await Contact.find();
  res.json({
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
