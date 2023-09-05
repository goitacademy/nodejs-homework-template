const getIndex = (arr, id) => {
  const index = arr.findIndex((el) => el.id === id);
  if (index === -1) {
    return null;
  }
  return index;
};

module.exports = { getIndex };
