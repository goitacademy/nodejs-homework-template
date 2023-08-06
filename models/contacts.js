const Contact = require("./schemas/contact");
const User = require("./schemas/users");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const listContacts = async () => {
  try {
    return Contact.find();
  } catch (err) {
    return err;
  }
};

const getContactById = async (contactId) => {
  try {
    const res = Contact.findOne({ _id: contactId });
    return res.then((res) => res).catch((err) => false);
  } catch (err) {
    return err;
  }
};

const removeContact = async (contactId) => {
  try {
    return Contact.findByIdAndDelete({ _id: contactId });
  } catch (err) {
    return err;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    return await Contact.create({
      name,
      email,
      phone,
    });
  } catch (err) {
    console.log("validation failed: ");
    return console.table(err.details);
  }
};

const updateContact = async (contactId, body) => {
  try {
    return Contact.findByIdAndUpdate({ _id: contactId }, body);
  } catch (err) {
    console.log("validation failed: ");
    console.table(err.details);
    return { message: "validationError", err };
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate({ _id: contactId }, body);
    return Contact.findById({ _id: contactId });
  } catch (err) {
    return { message: "validationError", err };
  }
};

const signup = async (email, password) => {
  try {
    const hash = bcrypt.hashSync(password, salt);
    return User.findOne({ email }).then((data) => {
      if (data) {
        return { message: "Email in use" };
      }
      return User.create({
        email,
        password: hash,
      });
    });
  } catch (err) {
    return err;
  }
};

const login = async (email, password) => {
  try {
    return await User.findOne({ email }).then(async (user) => {
      if (!user) {
        return { message: "401" };
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return { message: "401" };
      }
      return user;
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  login,
  signup,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
