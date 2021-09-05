const { Contact } = require('../../../models');

const removeContact = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const deletedById = await Contact.findByIdAndDelete(id);
    if (deletedById) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: deletedById,
        message: 'contact deleted',
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
