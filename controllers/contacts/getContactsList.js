const { listContacts } = require("../../services/contacts");
const { getContactsByQuery } = require("../../services/contacts");

const getContactsList = async (req, res) => {
  console.log(req.query);
  if (req.query.favorite) {
    const result = await getContactsByQuery("favorite");
    return res.json({ data: result, status: "success", code: 200 });
  }
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const result = await listContacts(_id, skip, limit);

  return res.json({ data: result, status: "success", code: 200 });
};

module.exports = getContactsList;
