const operations = require('../../models/operations');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
<<<<<<< Updated upstream
    const result = await operations.deleteById(contactId);

    if (!result) {
      const error = new Error(
        `Contact with id=${contactId} cant be removed. Try to send correct id`
      );
      error.status = 404;
      throw error;
=======
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      const err = new Error();
      err.status = 404;
      err.message = `Contact with ID=${contactId} not found`;
      throw err;
>>>>>>> Stashed changes
    }

    res.status(200).json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
