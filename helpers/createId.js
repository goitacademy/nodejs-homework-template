const createId = (contacts) => {
  let newId = 1;
  for (const key in contacts) {
    const { id } = contacts[key];
    if (Number(id) !== newId) {
      return newId.toString();
    }
    newId += 1;
  }
  return newId.toString();
};

module.exports = createId;
