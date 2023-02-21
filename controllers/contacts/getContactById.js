const ContactsModel = require("../../models");

const getContactById = async (req, res) => {
  const contact = await ContactsModel.findOne({
    _id: req.params.contactId,
  });

  if (!contact) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

module.exports = getContactById;
