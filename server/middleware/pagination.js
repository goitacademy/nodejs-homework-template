const pagination = () => {
  return (req, _, next) => {
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    req.pagination = {
      page: pageNumber,
      limit: pageSize,
      startIndex,
      endIndex,
    };
    next();
  };
};

export default pagination;
