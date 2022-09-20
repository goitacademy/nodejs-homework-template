const { listContacts } = require("../models/contacts");

const idMaker = async () => {
  const allContacts = await listContacts();
  const sortedContactsId = allContacts.map((el) => Number(el.id)).sort((a, b) => a - b);
  let checkId = false;
  const contactsId = sortedContactsId.reduce((acc, el, idx, arr) => {
    if (!checkId && arr[idx + 1] - el > 1) {
      acc = el + 1;
      checkId = true;
    }
    return acc;
  }, sortedContactsId[sortedContactsId.length - 1] + 1);
  return String(contactsId);
};

module.exports = idMaker;
