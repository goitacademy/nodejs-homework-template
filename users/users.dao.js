const { User } = require("./user.model");

class DuplicatedEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmailAlreadyTakenError";
  }
}

class UnknownDatabaseError extends Error {
  constructor() {
    super("Oops, something went wrong at database layer.");
  }
}

const createUser = async (userData) => {
  try {
    console.log("DAO userData", userData);
    return await User.create(userData);
  } catch (e) {
    console.error(e);

    if (e.code === 11000) {
      throw new DuplicatedEmailError(`${userData.email} is already taken`);
    }

    throw new UnknownDatabaseError();
  }
};

const getUser = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};

const updateUser = async (email, userData) => {
  try {
    return await User.findOneAndUpdate({ email }, userData);
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};

const addAvatar = async (id, userId, modifiedContact) => {
  try {
    return await Contact.findOneAndUpdate(
      { _id: id, owner: userId },
      modifiedContact,
      { new: true }
    );
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  addAvatar,
  DuplicatedEmailError,
  UnknownDatabaseError,
};
