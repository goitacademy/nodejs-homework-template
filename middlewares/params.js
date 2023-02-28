const params = (req, res, next) => {
  const { _id } = req.user;

  let page = 0;
  let limit = 0;
  let query = { owner: _id };

  if (req.query) {
    page = req.query.page;
    limit = req.query.limit;
  } else {
    page = 0;
    limit = 0;
  }

  if (req.query.favorite === undefined) {
    query = { owner: _id };
  } else {
    query = {
      owner: _id,
      favorite: req.query.favorite,
    };
  }

  const skip = (page - 1) * limit;

  req.query = query;

  req.skip = skip;
  req.limit = Number(limit);
  next();
};

module.exports = params;
