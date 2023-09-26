const { Contact } = require('../../models');
const { httpError, ctrlWrapper } = require('../../utils');

const updateContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner: userId },
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      throw httpError(404, 'Not found');
    }

    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = ctrlWrapper(updateContact);
