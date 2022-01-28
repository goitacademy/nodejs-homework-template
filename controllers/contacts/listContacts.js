const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json({
    status: "seccess",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listContacts;
