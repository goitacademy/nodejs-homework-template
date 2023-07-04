const getMissingFieldsMessage = (contact) => {
  const obligatoryFields = ["name", "email", "phone"];
  const missingFields = [];
  obligatoryFields.forEach((field) => {
    if (contact[field] === undefined) {
      missingFields.push(field);
    }
  });
  if (missingFields.length === 0) {
    return "";
  }
  let message;
  if (missingFields.length === 1) {
    message = `missing required field - ${missingFields[0]}`;
  } else {
    message = "missing required fields: ";
    missingFields.forEach((field, idx) => {
      message += idx === missingFields.length - 1 ? field : `${field}, `;
    });
  }
  return message;
};

module.exports = {
  getMissingFieldsMessage,
};
