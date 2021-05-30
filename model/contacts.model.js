const Contact = require("./schemas/contact");

const listContacts = async (userId, query) => {
  try {
    const {
      page = 1,
      limit = 20,
      offset = [(page - 1) * limit],
      favorite = null,
      filter,
      sortBy,
      sortByDesc,
    } = query;

    const optionsSearch = { owner: userId };

    if (favorite !== null) {
      optionsSearch.favorite = favorite;
    }

    const result = await Contact.paginate(optionsSearch, {
      page,
      offset,
      limit,
      select: filter ? filter.split("|").join(" ") : "",
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
    });

    const { docs: contacts, totalDocs: total } = result;
    return { contacts, total, offset, limit };
  } catch (e) {
    return e.message;
  }
};

const getContactById = async (contactId, userId) => {
  try {
    if (contactId) {
      const contact = await Contact.findOne({
        _id: contactId,
        owner: userId,
      }).populate({ path: "owner", select: "email subscription -_id" });
      return contact;
    }
  } catch (e) {
    return e.message;
  }
};

const removeContact = async (contactId, userId) => {
  if (contactId) {
    try {
      const contact = await Contact.findByIdAndRemove({
        _id: contactId,
        owner: userId,
      });
      return contact;
    } catch (e) {
      return e.message;
    }
  }
};

const addContact = async (body) => {
  if (body) {
    try {
      const { favorite } = body;

      if (!favorite) {
        const newContact = {
          ...body,
          favorite: false,
        };
        return await Contact.create(newContact);
      }

      return await Contact.create(body);
    } catch (e) {
      return e.message;
    }
  }
};

const updateContact = async (contactId, body, userId) => {
  if (contactId) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        { _id: contactId, owner: userId },
        { ...body },
        { new: true }
      );

      return updatedContact;
    } catch (e) {
      return e.message;
    }
  }
};

const updateStatusContact = async (contactId, body, userId) => {
  if (contactId && body) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        { _id: contactId },
        { ...body },
        { new: true }
      );
      return updatedContact;
    } catch (e) {
      return e.message;
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
