const { Contact } = require("./contact");
const { joiSchema } = require("./contact");
const { favoriteJoiSchema } = require("./contact");
const { User } = require("./user");
const { joiUserSchema } = require("./user");

module.exports = {
    Contact,
    User,
    joiSchema,
    favoriteJoiSchema,
    joiUserSchema
}