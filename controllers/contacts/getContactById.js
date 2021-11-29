/* eslint-disable quotes */
/* eslint-disable semi */
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId); // Contact.findOne(поиск по параметрам).
  if (!result) {
    const error = new Error(`Contact whith id=${contactId} not found.`);
    error.status = 404;
    // or use package "http-errors"
    throw error;
  }
  res.json({
    message: "success",
    code: 200,
    data: result,
  });
};

module.exports = getContactById;
