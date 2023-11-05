const Contact = require('../models/contactModel');


const updateFavoriteStatus = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const userId = req.user._id; 
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: 'Missing field favorite' });
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      { favorite },
      { new: true }
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};


const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const userId = req.user._id;
    const result = await Contact.findOneAndDelete({ _id: contactId, owner: userId });

    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateFavoriteStatus,
  deleteContact,
};
