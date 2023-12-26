const { catchAsync } = require('../helpers');
const { userService } = require('../service');

exports.registerUser = catchAsync(async (req, res) => {
    const user = await userService.register(req.body);
    res.status(201).json({
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
});

exports.loginUser = catchAsync(async (req, res) => {
    const { user } = req;
    const token = await userService.login(user)
    res.json({
        user: {
            email: user.email,
            subscription: user.subscription,
        },
        token
    });
});
