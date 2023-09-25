const { Contact } = require('../../models');
const { httpError, ctrlWrapper } = require('../../utils');

const updateContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    
    const contact = await Contact.findById(id);

    if (!contact) {
      throw httpError(404, 'Not found');
    }

    if (contact.owner.toString() !== userId.toString()) {
      throw httpError(403, 'Access denied');
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = ctrlWrapper(updateContact);
