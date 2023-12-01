const { Contact } = require("../../models");
const { status } = require("../../consts");
const { createPagination, createFilter, HttpError } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const filter = createFilter({ owner, ...req.query });

  if (filter === "errorparams") {
    throw HttpError(status.BAD_PARAMS);
  }

  const pagination = createPagination(req.query);

  if (pagination === "errorparams") {
    throw HttpError(status.BAD_PARAMS);
  }

  const contacts = await Contact.find(filter, null, pagination);

  res.json({ ...status.GET_SUCCESS, data: { contacts } });
};

module.exports = getAll;
