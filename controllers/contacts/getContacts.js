const { Contact } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const {
    page = 1,
    limit = 20,
    sortByAsc,
    sortByDesc,
    filter,
    favorite,
  } = req.query;
  const skip = (page - 1) * limit;
  let sortCriteria = null;
  let select = null;
  let condition = null;

  if (filter) select = filter.split('|').join(' ');
  if (sortByAsc) sortCriteria = { [sortByAsc]: 1 };
  if (sortByDesc) sortCriteria = { [sortByDesc]: -1 };
  if (favorite) {
    condition = { $and: [{ owner: _id }, { favorite }] };
  } else {
    condition = { owner: _id };
  }
  const results = await Contact.find(condition)
    .select(select)
    .skip(skip)
    .limit(limit)
    .sort(sortCriteria);

  const total = await Contact.countDocuments({ owner: _id });
  const shown = results.length;

  res.status(HTTP_STATUS_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_STATUS_CODE.OK,
    payload: {
      results,
      total,
      shown,
      page: parseInt(page),
      limit: parseInt(limit),
      skip,
      select,
      sortCriteria,
    },
  });
};

module.exports = getContacts;
