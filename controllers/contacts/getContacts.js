const { ContactsModel } = require("../../models");

const getContacts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const contactsList = await ContactsModel.find(
    {},
    "name email phone favorite",
    {
      limit,
      skip: limit * (page - 1),
    }
  );

  res.json({
    status: "success",
    code: 200,
    data: contactsList,
  });
};

module.exports = getContacts;
