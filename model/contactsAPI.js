const Contact = require("./schemas/contact");

const getAll = async (
  userId,
  { sortBy, sortByDesc, filter, limit = "5", page = "1" }
) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split("|").join(" ") : "",
      populate: {
        path: "owner",
        select: "name email",
      },
    }
  );
  const { docs: contacts, totalDocs: total } = results;
  return { total: total.toString(), limit, page, contacts };
};

const getById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

const remove = async (contactId, userId) => {
  const result = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const add = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const update = async (contactId, body, userId) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
};
