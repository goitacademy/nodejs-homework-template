const Contact = require("../models/contacts");

// const listContacts = async ({ limit, skip, sortCriteria, select }, user) => {
//   const total = await Contact.countDocuments({ owner: user.id })
//     .select(select)
//     .skip(skip)
//     .limit(limit)
//     .sort(sortCriteria);
//   const results = await Contact.find({ owner: user.id });
//   return { total, results };
// };

const listContacts = async ({ limit, skip, sortCriteria, select }, user) => {
  const { docs: contacts, ...rest } = await Contact.paginate(
    { owner: user.id },
    { limit, offset: skip, sort: sortCriteria, select }
  );
  return { contacts, ...rest };
};

module.exports = {
  listContacts,
};
