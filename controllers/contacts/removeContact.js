const { Contact } = require('../../models');
const { httpError, ctrlWrapper } = require('../../utils');

const removeContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
 
    const deletedContact = await Contact.findOneAndRemove({ _id: id, owner: userId });

    if (!deletedContact) {
      throw httpError(404, 'Not found');
    }

    res.json({
      message: 'Contact deleted',
    });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = ctrlWrapper(removeContact);
