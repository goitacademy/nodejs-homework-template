const { Contact } = require('../../models');

const updateStatus = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );

    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
