const { getContacts } = require("../../services/contactsService");

const getContactsController = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  console.log(favorite);
  const options = {
    page: page || 1,
    limit: limit || 20,
    customLabels: {
      totalDocs: "totalContacts",
      docs: "contacts",
      limit: "perPage",
      page: "currentPage",
      totalPages: "totalPages",
      pagingCounter: false,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: false,
      nextPage: false,
    },
  };
  const contacts = await getContacts(_id, options, favorite);
  return res.json(contacts);
};

module.exports = { getContactsController };
