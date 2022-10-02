const { Contact } = require("../../models/contact");

const listContact = async (_, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContact;
