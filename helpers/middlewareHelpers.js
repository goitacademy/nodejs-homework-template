const isPhoneInContacts = async (contacts, newPhone, contactId) =>
  await contacts.some(({_id, phone}) =>
    phone === newPhone && !_id.toString().includes(contactId),
  );

const isEmailInContacts = async (contacts, newEmail, contactId) =>
  await contacts.some(({_id, email}) =>
    email === newEmail && !_id.toString().includes(contactId),
  );

const responseErrorOrNext = (error, res, next) => {
  if (error) {
    const {message} = error.details[0];
    return res.status(400).json({message});
  }

  next();
};

module.exports = {
  isPhoneInContacts,
  isEmailInContacts,
  responseErrorOrNext,
};
