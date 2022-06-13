const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const data = await Contact.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: data,
    },
  });
};

module.exports = getAll;
