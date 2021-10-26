const getContactById = require("../model/getContactById");

const getSingleContact = async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  res.status(200).json(data);
};

module.exports = getSingleContact;
