const bcrypt = require("bcrypt");

const { getUserByemail, updateToken } = require("../controllers/users");
const issueToken = require("./issueToken");

const loginHandler = async (email, incomingPassword) => {
    const user = await getUserByemail(email);
    try {
        if (!user) {
            throw new Error({ message: "User not found!" });
        }
        const userPassword = user.password;
        const result = bcrypt.compareSync(incomingPassword, userPassword);
        if (result) {
            const token = issueToken(user);
            const updateUser = await updateToken(user._id, token);
            return updateUser;
        }
    } catch (error) {
        throw new Error({ message: "Invalid credentials" });
    }
};

module.exports = loginHandler;