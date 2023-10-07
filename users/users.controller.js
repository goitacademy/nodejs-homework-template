const signUpHandler = (req, res, next) => {
    return res.send({message: 'signup works!'});
};

module.exports = {
    signUpHandler,
}