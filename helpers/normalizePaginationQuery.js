const normalizePaginationQuery = (page, limit) => {
  const numberPage = Number(page);
  const numberLimit = Number(limit);

  return {
    normalizedPage:
      numberPage && parseInt(numberPage) > 0 ? parseInt(numberLimit) : 1,
    normalizedLimit:
      numberLimit && parseInt(numberLimit) > 0 ? parseInt(numberLimit) : 20,
  };
};

module.exports = normalizePaginationQuery;
