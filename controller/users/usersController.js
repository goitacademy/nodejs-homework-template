const { usersService } = require('../../service');

const userSignup = async (req, res, next) => {
    try {
        res.status(200).json({
            message: 'Signup'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" });
    };
};

const userLogin = async (req, res, next) => {
    try {
        res.status(200).json({
            message: 'Login'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" });
    };
};
        
const userLogout = async (req, res, next) => {
    try {
        res.status(200).json({
            message: 'Logout'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" });
    };
};
            
const userCurrent = async (req, res, next) => {
    try {
        res.status(200).json({
            message: 'current'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" });
    };
};

module.exports = {
    userSignup,
    userLogin,
    userLogout,
    userCurrent,
}