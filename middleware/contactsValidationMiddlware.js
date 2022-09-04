const { hasKeys } = require('../utils/hasKeys');
const { contactMandatoryFields } = require('../schemas/contactSchema');
const { emailRegExp, nameRegExp, phoneRegExp } = require('../constants/regexps');
const { acceptFormats } = require('../constants/acceptFormats');

const validateContactFields = (req, res, next) => {
    const { allMatch, missedKeys } = hasKeys(req.body, contactMandatoryFields);
   
    if(!allMatch) {
        return res
            .status(400)
            .json({
                message: `missing required fields: ${missedKeys?.join(', ')}`
            })
    }

    next();
}

const validateDataFormats = (req, res, next) => {
    const { name, email, phone } = req.body;

    const isNameValid = nameRegExp.test(name);
    const isEmailValid = emailRegExp.test(email);
    const isPhoneValid = phoneRegExp.test(phone);

    if(!isNameValid) return res.status(400).json(generateMessage('name'));
    if(!isEmailValid) return res.status(400).json(generateMessage('email'));
    if(!isPhoneValid) return res.status(400).json(generateMessage('phone'));

    next();
}

function generateMessage(fieldName) {
    return {
        message: `${fieldName} is invalid`,
        acceptFormats: acceptFormats[fieldName]
    }
}

module.exports = {
    getContactValidationMiddleware: () => [validateContactFields, validateDataFormats]
}