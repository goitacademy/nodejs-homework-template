const checkFieldHandler = body => {
  return async contacts =>
    contacts.findIndex(i => {
      const resultName = i.name.toLowerCase() === body.name.toLowerCase();
      console.log(resultName);

      return resultName;
    });
};

module.exports = checkFieldHandler;
