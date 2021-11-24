const updateContacts = require("./updateContacts");
const listContacts = require("./contacts/listContacts");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (item) => item.id.toString() === contactId.toString()
  );
  if (idx === -1) {
    return null;
  }
  // const [removeProduct] = products.splice(idx, 1);
  // await updateProducts(products);
  // return removeProduct
  const newContacts = contacts.filter(
    (_, index) => index.toString() !== idx.toString()
  );
  await updateContacts(newContacts);
  return contacts[idx];
};

module.exports = removeContact;
