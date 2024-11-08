const express = require('express');
const userContoller = require('../controllers/userController');
const authContoller = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authContoller.signup);
router.post('/login', authContoller.login);

router.post('/forgotPassword', authContoller.forgotPassword);
router.patch('/resetPassword/:token', authContoller.resetPassword);

router
    .route('/')
    .get(
        authContoller.protect,
        authContoller.restrictTo('admin'),
        userContoller.getAllUsers
    )
    .post(userContoller.createUser);

router
    .route('/:id')
    .get(userContoller.getUser)
    .patch(userContoller.updateUser)
    .delete(userContoller.deleteUser);

module.exports = router;