const Contact = require("../schemas/contacts");

const getAllContacts = async ({ owner, page, limit, favorite }) => {
  const startIndex = (page - 1) * limit;

  const query = { owner };
  if (favorite !== undefined) {
    query.favorite = favorite;
  }

  try {
    const contacts = await Contact.find(query)
      .skip(startIndex)
      .limit(limit)
      .exec();

    const filteredContacts = contacts.filter((contacts) => contacts.owner);

    const totalContacts = filteredContacts.length;

    const totalPages = Math.ceil(totalContacts / limit);

    return {
      contacts: filteredContacts,
      currentPage: page,
      totalPages,
      totalContacts,
    };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching contacts.");
  }
};

const createContact = ({ name, email, phone, favorite, owner }) => {
  return Contact.create({ name, email, phone, favorite, owner });
};

module.exports = {
  getAllContacts,
  createContact,
};
