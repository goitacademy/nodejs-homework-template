const { Contact } = require("../../service/schemasContacts");

const addContactById = async (req, res) => {
  const { body } = req;
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...body, owner });
  res.json({
    status: "success",
    code: 201,
    data: { contact: result },
  });
};
module.exports = addContactById;
