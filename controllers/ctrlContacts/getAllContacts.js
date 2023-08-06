const { contactsService } = require("../../services");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    page = 1,
    limit = 20,
    sort = "name",
    order = "asc",
    ...filter
  } = req.query;

  const skip = (page - 1) * limit;

  const orderBy = order === "desc" ? -1 : 1;

  const { data, count } = await contactsService.getAllContacts(
    { owner, ...filter },
    { skip, limit: +limit },
    { [sort]: orderBy }
  );

  if (count && data.length) {
    return res.json({ page, per_page: limit, total: count, data });
  }

  res.status(204).json({ message: "No Content" });
};

module.exports = getAllContacts;