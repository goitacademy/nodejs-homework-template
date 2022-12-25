const {Contact} = require("../../models/contact");
const listContacts = async (_, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
