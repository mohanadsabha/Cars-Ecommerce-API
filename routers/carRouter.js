const express = require('express');
const carController = require('../controllers/carController');
const authContoller = require('../controllers/authController');

const router = express.Router();

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
// aliasing
router
    .route('/top-5-cars')
    .get(carController.aliasTopCars, carController.getAllCars);

// aggregation pipeline
router.route('/tour-stats').get(carController.getCarStats);
router.route('/monthly-plan/:year').get(carController.getMonthlyPlan);
*/

module.exports = router;
