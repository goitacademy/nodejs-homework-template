module.exports = {
  trimData: data => {
    for (let key in data) {
      data[key] = data[key].trim();
    }
  },
};
