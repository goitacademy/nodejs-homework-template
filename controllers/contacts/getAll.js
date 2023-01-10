const { Contacts } = require("../../models");

const getAll = async (req, res) => {
  const contacts = await Contacts.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
