const signin = (req, res) => {
    const { email, password } = req.body;
}

const signout = (req, res) => {
    
}

const signup = (req, res) => {
    const {
        name,
        password,
        email,
        phone
    } = req.body;
}

module.exports = {
    signin,
    signout,
    signup,
};