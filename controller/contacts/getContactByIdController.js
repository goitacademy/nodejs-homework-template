const {
  getContactByIdService,
} = require("../../servises/getContactByIdService");

const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactByIdService(contactId);
  res.status(200).json({ data });
};

module.exports = getContactsByIdController;
