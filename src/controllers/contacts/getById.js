const { getContactById } = require("../../models/index");
const createError = require('http-errors');

const getById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      throw createError(404, `Product with ID=${contactId} not found`);
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contact },
    });
  } catch(e) {
    return res.status(e.statusCode || 500).json({
      message: e.message
    })
  }
};

module.exports = getById;
