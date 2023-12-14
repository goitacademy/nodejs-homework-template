const pagination = (contactsLength, page, limit) => {
  let pagValues = {};
  const pages = limit > contactsLength ? 1 : Math.ceil(contactsLength / limit);
  if (page > pages) {
    const li = (pages - 1) * limit;
    const ls = contactsLength + 1;
    pagValues = {
      pages,
      limitInf: li,
      limitSup: ls,
    };
  } else {
    const limitSup =
      page * limit > contactsLength ? contactsLength : page * limit;
    const limitInf = limit >= limitSup ? 0 : limitSup - limit;
    pagValues = {
      pages,
      limitInf,
      limitSup,
    };
  }
  return pagValues;
};

const filterContacts = (list, { favorite = null, page = 1, limit = 5 }) => {
  const contactsGroupOne =
    favorite === null
      ? list
      : list.filter((contact) => contact.favorite === JSON.parse(favorite));
  const { pages, limitInf, limitSup } = pagination(
    contactsGroupOne.length,
    page,
    limit
  );
  const contactsGroupTwo = contactsGroupOne.slice(limitInf, limitSup);
  return {
    page: parseInt(page),
    limit: parseInt(limit),
    pages,
    limitInf,
    limitSup,
    length: contactsGroupOne.length,
    contacts: contactsGroupTwo,
  };
};

module.exports = {
  filterContacts,
};
