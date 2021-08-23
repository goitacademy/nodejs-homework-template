const Joi = require('joi')

const contactJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .pattern(
            // eslint-disable-next-line
            new RegExp(
                "^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$"
            )
        )
        .required(),
    // eslint-disable-next-line
    phone: Joi.string().pattern(new RegExp("^.[0-9]{3}. [0-9]{3}-[0-9]{4}$")).required(),
})

module.exports = contactJoiSchema