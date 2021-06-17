const ContactSchema = require('../model/contact');

const listContacts = async (userId, query) => {

  console.log(query);
  // const results = await ContactSchema.find({ owner: userId }).populate({
  //   path: 'owner',
  //   select: 'name email phone favorite -_id'
  // });
  const {
    page = 1,
    limit = 5,
    favorite = null
  } = query;

  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  };

  const results = await ContactSchema.paginate(
    optionsSearch,
    {
      page,
      limit,
      populate: { path: 'owner', select: 'name email phone favorite' }
    }
  );

  return results;
};

const getContactById = async (userId, contactId) => {
  const contactById = await ContactSchema.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name email phone favorite'
  });
  return contactById;
};

const removeContact = async (userId, contactId) => {
  const result = await ContactSchema.findOneAndRemove({ _id: contactId, owner: userId })
  return result;
};

const addContact = async (userId, body) => {
  const result = await ContactSchema.create({ owner: userId, ...body });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await ContactSchema.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const updateStatusContact = async (userId, contactId, body) => {
  const result = await ContactSchema.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { favorite: body.favorite },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};