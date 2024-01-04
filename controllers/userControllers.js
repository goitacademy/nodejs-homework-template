const { catchAsync } = require('../helpers');
const { userService } = require('../service');

exports.register = catchAsync(async (req, res) => {
    const { email, subscription } = await userService.register(req.body);
    res.status(201).json({
        user: {
            email,
            subscription,
        },
    });
});

exports.login = catchAsync(async (req, res) => {
    const { email, subscription, token } = await userService.login(req.user);
    res.json({
        user: {
            email,
            subscription,
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
    const user = await userService.updateSubscription(req.user.id, req.body)
    res.json({user})
})