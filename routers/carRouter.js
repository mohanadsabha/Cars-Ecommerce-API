const express = require('express');
const carController = require('../controllers/carController');
const authContoller = require('../controllers/authController');

const router = express.Router();

router.use('/:carId/reviews', reviewRouter);

router
    .route('/')
    .get(carController.getAllCars)
    .post(
        authContoller.protect,
        authContoller.restrictTo('admin'),
        carController.addCar
    );
router
    .route('/:id')
    .get(carController.getCar)
    .patch(
        authContoller.protect,
        authContoller.restrictTo('admin'),
        carController.updateCar
    )
    .delete(
        authContoller.protect,
        authContoller.restrictTo('admin'),
        carController.deleteCar
    );

/*
router
    .route('/top-5-cars')
    .get(carController.aliasTopCars, carController.getAllCars);
router.route('/car-stats').get(carController.getCarStats);
*/

module.exports = router;
