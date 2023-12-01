const convertToInteger = require("./convertToInteger");

const createPagination = (query) => {
  const { page, limit } = query;

  if (!page && !limit) {
    return null;
  }

  const intPage = convertToInteger(page);
  const intLimit = convertToInteger(limit);

  if (!intPage || !intLimit) {
    return "errorparams";
  }

  return {
    skip: (intPage - 1) * limit,
    limit: intLimit,
  };
};

module.exports = createPagination;
