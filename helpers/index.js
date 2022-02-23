const validators = require('./validators');
const {setndMail} = require('./mail-handler');
const { getMail } = require('./utils')

module.exports = {
    validators,
    setndMail,
    getMail
};
