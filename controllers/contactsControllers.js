const Contacts = require('../models/contacts');

const catchAsync = require('../utils/catchAsync');

exports.getContactsList = catchAsync(async (req, res) => {
  const contacts = await Contacts.find().select('-__v');
  res.status(200).json({ contacts });
});

exports.getById = async (req, res) => {
  const { contact } = req;

  res.status(200).json({
    contact,
  });
};

exports.addContact = async (req, res) => {
  const newContact = await Contacts.create({ ...req.body });
  res.status(201).json({
    contact: newContact,
  });
};

exports.removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contacts.findByIdAndDelete(contactId);

  if (!result)
    return res.status(404).json({
      message: 'There is no user with this id',
    });
  res.sendStatus(204);
};

exports.updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    {
      name,
      email,
      phone,
    },
    { new: true }
  );

  if (!updatedContact)
    return res.status(404).json({
      message: 'There is no user with this id',
    });

  return res.status(200).json({
    message: 'Contact updated',
    updatedContact: updatedContact,
  });
};

exports.isFavoriteById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const isFavorite = await Contacts.findById(contactId).select('name favorite -_id ');

  if (!isFavorite)
    return res.status(404).json({
      message: 'There is no user with this id',
    });

  return res.status(200).json({
    isFavorite,
  });
});

exports.updateFavorite = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;

  const updatedFavorite = await Contacts.findByIdAndUpdate(
    contactId,
    {
      favorite: favorite,
    },
    { new: true }
  );

  if (!updatedFavorite)
    return res.status(404).json({
      message: 'There is no user with this id',
    });

  return res.status(200).json({
    updatedFavorite,
  });
};
