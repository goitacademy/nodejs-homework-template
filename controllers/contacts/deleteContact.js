const operations = require('../../models/operations');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await operations.deleteById(contactId);

    if (!result) {
      const error = new Error(
        `Contact with id=${contactId} cant be removed. Try to send correct id`
      );
      error.status = 404;
      throw error;
    }

    res.status(200).json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
