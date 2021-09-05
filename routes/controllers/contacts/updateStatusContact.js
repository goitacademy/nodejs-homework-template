const { Contact } = require('../../../models');

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true },
    );
    if (updatedContact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: updatedContact });
    }
    return res
      .status(400)
      .json({ status: 'error', code: 404, message: 'missing field favorite' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
