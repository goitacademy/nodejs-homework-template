const { User } = require('../mod/user');


async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;


  user.contacts.push({_id: contactId});
// Variant-1
  // const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true, fields: {contacts: 1}});
// Variant-2
   const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true}).select({contacts: 1, _id: 0,});


  console.log("updatedContact:", updatedUser)

  return res.status(201).json({
    data: {
      contacts: updatedUser.contacts,
    },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;
  const userWithContacts = await User.findById(user._id).populate("contacts", { name: 1, email: 1, phone: 1, favorite: 1, _id: 1 });

  return res.status(200).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
}

async function me(req, res, next) {
  const { user } = req;
  const { email, _id: id, subscription } = user;

  return res.status(200).json({
    date: {
      user: {
        email,
        id,
        subscription,
      },
    },
  });
}

module.exports = {
  createContact,
  getContacts,
  me,
};
