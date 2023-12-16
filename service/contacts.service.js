import Contact from './schemas/contact.schema.js';

const getCurrentUserFilteredContactsFromDB = async ({ favorite, owner, page, limit }) => {
  if (!favorite) {
    const totalHits = await Contact.find({ owner }).countDocuments();
    const totalPages = Math.ceil(totalHits / limit);
    const currentPage = Math.min(page, totalPages);

    if (page > totalPages) {
      return null;
    }

    const pagination = {
      currentPage,
      totalPages,
      totalHits,
    };

    const contacts = await Contact.find({ owner })
      .skip((page - 1) * limit)
      .limit(limit);

    const result = {
      pagination,
      contacts,
    };

    return result;
  } else {
    const totalHits = await Contact.find({ owner, favorite }).countDocuments();
    const totalPages = Math.ceil(totalHits / limit);
    const currentPage = Math.min(page, totalPages);

    if (page > totalPages) {
      return null;
    }

    const pagination = {
      currentPage,
      totalPages,
      totalHits,
    };

    const contacts = await Contact.find({ owner, favorite })
      .skip((page - 1) * limit)
      .limit(limit);
    const result = {
      pagination,
      contacts,
    };

    return result;
  }
};

const getCurrentUserContactByIdFromDB = async ({ owner, id }) =>
  await Contact.findOne({ _id: id, owner });

const createContactInDB = async ({ name, email, phone, owner }) =>
  await Contact.create({ name, email, phone, owner });

const updateCurrentUserContactInDB = async ({ id, name, email, phone, favorite, owner }) => {
  const contact = await Contact.findOne({ _id: id, owner });
  if (!contact) {
    return null;
  }
  return await Contact.findByIdAndUpdate(
    { _id: id },
    { name, email, phone, favorite, owner },
    { new: true },
  );
};

const removeCurrentUserContactFromDB = async ({ id, owner }) => {
  const contact = await Contact.findOne({ _id: id, owner });
  if (!contact) {
    return null;
  }

  return await Contact.findByIdAndRemove({ _id: id });
};

export {
  getCurrentUserFilteredContactsFromDB,
  getCurrentUserContactByIdFromDB,
  createContactInDB,
  updateCurrentUserContactInDB,
  removeCurrentUserContactFromDB,
};
