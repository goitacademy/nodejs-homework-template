const { contact: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const listContacts = async (req, res, next) => {
  const query = req.query;

  const filter = {
    owner: req.user._id,
  };

  if (query.favorite) {
    filter.favorite = query.favorite;
  }

  const options = {
    page: req.query.page,
    limit: req.query.limit,
    collation: {
      locale: 'en',
    },
  };

  try {
    const result = await service.listContacts(filter, options);
    res.status(HTTP_STATUS.SUCCESS).json({
      status: 'Success',
      code: HTTP_STATUS.SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;