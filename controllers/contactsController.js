import Contact from '../models/contactsModel.js';
import User from '../models/usersModel.js';


const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      return contact;
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.deleteOne({ _id: contactId });
    if (result.deletedCount === 1) {
      return 'Contact deleted';
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (updatedContact) {
      return updatedContact;
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );
    if (updatedContact) {
      return updatedContact;
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};
const updateAvatar = async (userId, filename) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarURL: `/avatars/${filename}` },
      { new: true }
    );

    return updatedUser.avatarURL;
  } catch (error) {
    throw error;
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  updateAvatar,
};





// import { generateVerificationToken } from '../utils/tokenUtils.js';
// import { sendVerificationEmail } from '../utils/emailUtils.js';
// const createUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user with the same email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Generate verification token
//     const verificationToken = generateVerificationToken();

//     // Create new user
//     const newUser = new User({
//       email,
//       password,
//       verificationToken,
//     });

//     // Save user to the database
//     await newUser.save();

//     // Send verification email
//     await sendVerificationEmail(email, verificationToken);

//     return res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const verifyUser = async (req, res) => {
//   try {
//     const { verificationToken } = req.params;

//     // Find user by verification token
//     const user = await User.findOne({ verificationToken });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update user verification status
//     user.verify = true;
//     user.verificationToken = null;
//     await user.save();

//     return res.status(200).json({ message: 'Verification successful' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const resendVerificationEmail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Check if user is already verified
//     if (user.verify) {
//       return res.status(400).json({ message: 'Verification has already been passed' });
//     }

//     // Generate new verification token
//     const verificationToken = generateVerificationToken();

//     // Update user verification token
//     user.verificationToken = verificationToken;
//     await user.save();

//     // Send verification email
//     await sendVerificationEmail(email, verificationToken);

//     return res.status(200).json({ message: 'Verification email sent' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export { createUser, verifyUser, resendVerificationEmail };
