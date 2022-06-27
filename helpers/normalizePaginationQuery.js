const normalizePaginationQuery = (page, limit) => {
  const numberPage = Number(page);
  const numberLimit = Number(limit);

  return {
    normalizedPage: numberPage && numberPage > 0 ? numberPage : 1,
    normalizedLimit: numberLimit && numberPage > 0 ? numberPage : 20,
  };
};

module.exports = normalizePaginationQuery;
