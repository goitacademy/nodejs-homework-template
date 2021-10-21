const { NotFound, Forbidden, BadRequest  } = require("http-errors");
const { sendEmail, sendSuccessRes } = require("../../helpers");
const { User } = require("../../models");

const reverification = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new BadRequest("There is no such e-mail");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFound("User not found");
    }

    if (user.verivy) {
        throw new Forbidden("User already verified");
    }

    const data = {
        to: email,
        subject: "Confirmations of registration on the site",
        html: `
            <a href="http://localhost:3000/api/auth/verify/${user.verifyToken}"
            target="_blank">Подтвердить почту</a>
            `
    };

    await sendEmail(data);

    sendSuccessRes(res, null, 201);
}

module.exports = reverification;