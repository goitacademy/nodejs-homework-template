const { Contact } = require('./models/contactModel');

const listContacts = async (query, owner) => {
    const findQuery = {};
    if (query.favorite) findQuery.favorite = query.favorite;
    if (query.search)
        findQuery[`${query.field || 'name'}`] = { $regex: query.search, $options: 'i' };

    const paginationLimit = Number(query.limit) ?? 10;
    const paginationPage = Number(query.page) ?? 1;

    const contacts = await Contact.find(findQuery)
        .sort(`${query.order === 'DESC' ? '-' : ''}${query.sort || 'name'}`)
        .limit(paginationLimit)
        .skip((paginationPage - 1) * paginationLimit);
    const total = await Contact.countDocuments(findQuery);
    return { contacts, total };
};
