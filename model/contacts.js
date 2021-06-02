const Contact = require("./schemas/contact");

const listContacts = async (userId, query) => {
  const {
    page = 1,
    limit = 20,
    offset = 0,
    sortBy, 
    sortByDesc, 
    filter, 
    favorite = null,
  } = query;
  const searchOptions = { owner: userId };
  if (favorite !== null) {
    searchOptions.favorite = favorite;
  }

  const results = await Contact.paginate(searchOptions, {
    page,
    limit,
    offset,
    select: filter ? filter.split('|').join(' ') : '', 
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}), 
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    populate: { path: 'owner', select: 'name email subscription -_id' },
  });
  const { docs: contacts, totalDocs:total } = results;
  return {total,contacts, limit, offset};
}


const getById = async (userId,id) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email subscription",
  })
  return result;
}

const removeContact = async (userId,id) => {
  const  result= await Contact.findByIdAndRemove({ _id:id,owner: userId });
  return result;
}

const create = async (body) => {
  const result = await Contact.create(body);
  return result;
}

const update = async (userId,id, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: id,
    owner: userId},
    {...body},
    { new: true });
  return result;
}

const updateStatusContact = async (userId,id, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: id,
    owner: userId},
    {...body},
    { new: true });
  return result;
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  create,
  update,
  updateStatusContact,
}
