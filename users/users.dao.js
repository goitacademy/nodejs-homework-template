const { v4: uuid } = require('uuid');
const User = require('./user.schema');

class DuplicatedKeyError extends Error {
    constructor(keyName, value) {
        super(`${keyName} has to be unique. ${value} is already taken.`);
    }
};

class UnknownDatabaseError extends Error {
    constructor() {
        super('Oops, something went wrong at database layer.');
    }
};

const createUser = async ({ email, password, avatarURL }) => {
    try {
        const result = await User.create({ 
            email,
            password,
            avatarURL,
            verify: false,
            verificationToken: uuid()
        });
        return result;
    } catch (e){
        console.log(e);

        if (e.code === 11000) {
            const [[ key, value ]] = Object.entries(e.keyValue);
            throw new DuplicatedKeyError(key, value);
        }
        throw new UnknownDatabaseError();
    }
};

const getUser = async (filter) => {
    try {
        return await User.findOne(filter);
    } catch (e) {
        console.log(e);
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

module.exports = {
    createUser,
    getUser,
    updateUser,
    DuplicatedKeyError,
    UnknownDatabaseError,
};