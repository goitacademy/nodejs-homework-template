const { Contact } = require('../../../models');

const updateContacts = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const updatedById = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedById) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: updatedById });
    }
    return res
      .status(400)
      .json({ status: 'error', code: 404, message: 'missing fields' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContacts;
