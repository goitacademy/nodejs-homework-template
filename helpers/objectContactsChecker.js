const objectContactsChecker = (object) => {
    const CONTACTS = ['name', 'email', 'phone'];
    const allowContacts = CONTACTS.filter((contact) => object[contact] === undefined);
    if (allowContacts.length > 1) {
      return `Missing required ${allowContacts.join(", ")} fields`;
    }
    return `Missing required ${allowContacts[0]} field`;
  };
  
  module.exports = objectContactsChecker;
