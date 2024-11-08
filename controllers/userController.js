const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    // Excute Query
    const users = await User.find();
    // Send Query
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: { users },
    });
});
exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route in not yet implemented',
    });
};
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route in not yet implemented',
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route in not yet implemented',
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route in not yet implemented',
    });
};
