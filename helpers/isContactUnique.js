function isContactUnique(data, name, email, phone, exeptionId) {
  let dataToCheck = [...data];
  if (exeptionId !== undefined) {
    dataToCheck = [...data.filter((item, i) => i !== exeptionId)];
  }
  const result = dataToCheck.some((item) => {
    return item.name === name || item.email === email || item.phone === phone;
  });

  return !result;
}

module.exports = isContactUnique;
