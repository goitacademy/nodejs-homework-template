const { Contact } = require("../models/contact");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (_id) => {
  const contacts = await Contact.find({ _id });
  return contacts;
};
const removeContact = async (_id) => {
  try {
    return Contact.findByIdAndDelete({ _id });
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await fs.readFile(contactsPath);
    const dataParse = JSON.parse(data);
    const contactIndex = Number(dataParse[dataParse.length - 1].id) + 1;
    const newContact = {
      id: `${contactIndex}`,
      name,
      email,
      phone,
    };
    const addData = [...dataParse, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(addData));

    return newContact;
  } catch (err) {
    throw err;
  }
};

const updateContact = async (id, newContact) => {
  const updatedContact = await Contact.findByIdAndUpdate({ id, newContact });
  return updatedContact;
};

const updateStatusContact = async (id, favorite) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
