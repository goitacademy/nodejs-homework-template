const contactsModel = require("../../services/contacts");

const getAll = async (req, res) => {
  const contacts = await contactsModel.getAll();

  res
    .status(200)
    .json({
      data: {contacts},
    });
};

module.exports = getAll;