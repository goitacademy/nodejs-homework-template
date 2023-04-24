const mapContactOutput = (contactDocument) => {
  const { _id, ...rest } = contactDocument.toObject();

  const mappedContact = {
    id: _id,
    ...rest,
  };

  return mappedContact;
};

module.exports = {
  mapContactOutput,
};
