const { Contact } = require("../../models");

const getListContacts = async (req, res) => {
  const products = await Contact.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      result: products,
    },
  });
};

module.exports = getListContacts;
