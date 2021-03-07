const Contact = require("./schema/schema-contacts");

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

async function listContacts(
  userId,
  { sortBy, sortByDesc, limit = "5", offset = "0" }
) {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      populate: {
        path: "owner",
        select: "name email sex -_id",
      },
    }
  );
  const { docs: contacts, totalDocs: total } = results;

  return { total: total.toString(), limit, offset, contacts };
}

async function filter(sub, userId) {
  const result = await Contact.find({
    subscription: { $eg: sub },
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email sex -_id",
  });
  return result;
}

async function getContactById(contactId, userId) {
  const result = await Contact.find({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email sex -_id",
  });
  return result;
}

async function removeContact(contactId, userId) {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
