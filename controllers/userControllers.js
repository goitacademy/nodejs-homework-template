const { catchAsync, HttpError, sendEmail } = require('../helpers');
const { userService } = require('../service');

exports.register = catchAsync(async (req, res) => {
    const { email, subscription, verificationToken } = await userService.register(req.body);
    const url = `${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}`;

    await sendEmail.verify(email, url)

    res.status(201).json({
        user: {
            email,
            subscription,
        },
    });
});

exports.verify = catchAsync(async (req, res) => {
    const { verificationToken } = req.params;
    await userService.verify(verificationToken)
    res.json({ message: 'Verification successful' });
})

exports.sendVerifyToken = catchAsync(async (req, res) => {
    const user = await userService.findUserByFilter({ email: req.body.email })
    console.log("user:", user)
    if (!user) throw new HttpError(404, 'User not found')
    if (user.verify) throw new HttpError(400, 'Verification has already been passed');

    const url = `${req.protocol}://${req.get('host')}/api/users/verify/${user.verificationToken}`;

    await sendEmail.verify(user.email, url);

    res.json({
        message: 'Verification email sent',
    });
})

exports.login = catchAsync(async (req, res) => {
    const { email, subscription, token, avatarURL } = await userService.login(req.user);
    res.json({
        user: {
            email,
            subscription,
            avatarURL,
        },
        token,
    });
});

exports.logout = catchAsync(async (req, res) => {
    await userService.logout(req.user);
    res.sendStatus(204);
});

exports.current = (req, res) => {
    const { email, subscription } = req.user;
    res.json({email, subscription})
};

exports.updateSubscription = catchAsync(async(req, res) => {
    const { email, subscription, token, avatarURL } = await userService.updateSubscription(
        req.user.id,
        req.body
    );
    res.json({
        user: {
            email,
            subscription,
            avatarURL,
        },
        token,
    });
})

exports.uploadAvatar = catchAsync(async (req, res) => {
    if(!req.file) throw new HttpError(400, 'File must be required')
    const avatarURL = await userService.updateAvatar(req.user.id, req.file)
    res.json({avatarURL})
})