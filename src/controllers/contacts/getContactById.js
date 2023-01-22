const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    return res.status(400).json({ status: 400, message: "Not found" });
  }
  res.status(200).json({ data, status: 200, message: "operation successful" });
};

module.exports = {
  getById,
};
