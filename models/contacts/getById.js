const getAll = require("./listContacts");

const getById = async (id) => {
  const products = await getAll();
  const result = products.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getById;
