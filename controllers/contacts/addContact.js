const addContact = async (name, email, phone, next) => {
  try {
    const newContact = await Contact.create({ name, email, phone });
    return newContact;
  } catch (error) {
    next(error);
  }
};

module.exports=addContact