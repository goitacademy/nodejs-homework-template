const {
  getContactByIdService,
} = require("../../servises/getContactByIdService");

const getContactsByIdController = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const data = await getContactByIdService(contactId, _id);
  res.status(200).json({ data });
};

module.exports = getContactsByIdController;
