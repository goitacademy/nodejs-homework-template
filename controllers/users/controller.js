const { usersServices } = require('../../services');
const { usersSchemas } = require('../../schemas');
const { RequestError } = require('../../helpers');

const registerUser = async (req, res) => {
    const { error, value: userData } = usersSchemas.registerUser.validate(
        req.body,
    );
    if (error) throw RequestError(400, error.details[0].message);

    const newUser = await usersServices.register(userData);

    res.status(201).json(newUser);
};

const logInUser = async (req, res) => {
    const { error, value: userData } = usersSchemas.registerUser.validate(
        req.body,
    );
    if (error) throw RequestError(400, error.details[0].message);

    const loggedInUser = await usersServices.logIn(userData);

    res.json(loggedInUser);
};

const logOutUser = async (req, res) => {
    const { id } = req.user;

    await usersServices.logOut(id);

    res.status(204).json();
};

const listCurrentUser = async (req, res) => {
    const { id } = req.user;

    const currentUser = await usersServices.listCurrent(id);

    res.json(currentUser);
};

const updateUserSubscription = async (req, res) => {
    const { error } = usersSchemas.updateSubscription.validate(req.body);
    if (error) throw RequestError(400, error.details[0].message);

    const { id } = req.user;

    const updatedUser = await usersServices.updateSubscription(id, req.body);

    res.json(updatedUser);
};

const updateUserAvatar = async (req, res) => {
    const { path, originalname } = req.file;
    const { id } = req.user;

    const newAvatar = await usersServices.updateAvatar(path, originalname, id);

    res.json(newAvatar);
};

module.exports = {
    registerUser,
    logInUser,
    logOutUser,
    listCurrentUser,
    updateUserSubscription,
    updateUserAvatar,
};
