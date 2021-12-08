const {
  getContactsByQuery,
  listContactsPerPage,
  listContacts,
} = require("../../services/contacts");

const getContactsList = async (req, res) => {
  if (req.query.favorite) {
    const result = await getContactsByQuery("favorite");
    return res.json({ data: result, status: "success", code: 200 });
  }

  if (req.query.page) {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const { _id } = req.user;
    const result = await listContactsPerPage(_id, skip, limit);

    return res.json({ data: result, status: "success", code: 200 });
  }

  const result = await listContacts();

  return res.json({ data: result, status: "success", code: 200 });
};

module.exports = getContactsList;
