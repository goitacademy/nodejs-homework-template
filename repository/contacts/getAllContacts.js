const { Contact } = require("../../model");

const getAllContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = 10, skip = 0 }
) => {
  let sortCriteria = null;
  const total = await Contact.find({ owner: userId }).countDocuments();
  let result = Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "id subscription email",
  });
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 };
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    result = result.select(filter.split("|").join(" "));
  }
  result = await result
    .skip(Number(skip))
    .limit(Number(limit))
    .sort(sortCriteria);
  return { total, contacts: result };
};

module.exports = getAllContacts;
