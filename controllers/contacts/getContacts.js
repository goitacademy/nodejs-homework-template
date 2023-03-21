const { Contact } = require("../../models");

const getContacts = async (req, res) => {
  const { sort, order, page, limit, search } = req.query;

  const findOptions = search
    ? { email: { $regex: search, $options: "i" } }
    : {};
  const contactsQuery = Contact.find(findOptions);

  const paginationPage = +page || 1;
  const paginationLimit = +limit || 20;
  const skip = (paginationPage - 1) * paginationLimit;

  contactsQuery
    .skip(skip)
    .limit(paginationLimit)
    .sort(`${order === "DESC" ? "-" : ""}${sort}`);
  const contacts = await contactsQuery;

  res.json({
    status: "success",
    code: 200,
    data: { total: contacts.length, result: contacts },
  });
};

module.exports = getContacts;
