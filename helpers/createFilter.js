const checkBoolean = require("./checkBoolean");

const createFilter = (objFilters) => {
  const { owner, favorite } = objFilters;
  const filter = { owner };

  if (!favorite) {
    return filter;
  }

  if (!checkBoolean(favorite)) {
    return "errorparams";
  }

  filter.favorite = favorite;
  return filter;
};

module.exports = createFilter;
