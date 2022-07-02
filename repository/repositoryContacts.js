const { Contact } = require('../models');
const { Types } = require('mongoose');
const getContactsList = async (userId, { limit = 20, page = 1, favorite, skip = 0 }) => {
  if (favorite) {
    const total = await Contact.find({ owner: userId, favorite }).countDocuments();
    const contactsFavorite = await Contact.find({ owner: userId, favorite })
      .skip(Number(skip))
      .limit(Number(limit))
      .populate({
        path: 'owner',
        select: 'name role',
      });
    return {
      total,
      contacts: contactsFavorite,
    };
  } else {
    const total = await Contact.find({ owner: userId }).countDocuments();
    const contacts = await Contact.find({ owner: userId }).skip(Number(skip)).limit(Number(limit)).populate({
      path: 'owner',
      select: 'name role',
    });

    return { total, contacts };
  }
};

const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name role',
  });
};

const findByContactEmail = async (userId, email) => {
  return await Contact.findOne({ email, owner: userId });
};

const addContact = async (userId, body) => {
  return await Contact.create({ ...body, owner: userId });
};

const removeContactById = async (userId, contactId) => {
  return await Contact.findOneAndRemove({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name role',
  });
};

const updateContactById = async (userId, contactId, body) => {
  return await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true },
  ).populate({
    path: 'owner',
    select: 'name role',
  });
};

const updateStatusContactById = async (userId, contactId, favorite) => {
  return await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, { favorite }, { new: true }).populate({
    path: 'owner',
    select: 'name role',
  });
};
const getStatisticsContacts = async id => {
  const data = await Contact.aggregate([
    { $match: { owner: Types.ObjectId(id) } },
    {
      $group: {
        _id: 'stats',
        totalAge: { $sum: '$age' },
        minAge: { $min: '$age' },
        maxAge: { $max: '$age' },
        avgAge: { $avg: '$age' },
      },
    },
  ]);
  return data;
};

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContactById,
  getStatisticsContacts,
  findByContactEmail,
};
