import Contact from "../../model/contact";

const listContacts = async ({
  sortBy,
  sortByDesc,
  filter,
  limit = 10,
  skip = 0,
}) => {
  let sortCriteria = null;
  const total = await Contact.find().countDocuments();
  let result = Contact.find();
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

export default listContacts;