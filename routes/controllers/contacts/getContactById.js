const { Contact } = require('../../../models');

const getContactById = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const contactById = await Contact.findById(id);
    if (contactById) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: contactById });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
