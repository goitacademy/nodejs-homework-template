const trimData = data => {
  for (let key in data) {
    data[key] = data[key].trim();
  }
};

module.exports = {
  trimData,
};
