const Car = require('../models/carModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCars = catchAsync(async (req, res, next) => {
    // Excute Query
    const features = new APIFeatures(Car.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const cars = await features.query;
    // Send Query
    res.status(200).json({
        status: 'success',
        results: cars.length,
        data: { cars },
    });
});
exports.getCar = catchAsync(async (req, res, next) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        return next(new AppError('No car found with that id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { car },
    });
});
exports.addCar = catchAsync(async (req, res, next) => {
    const newCar = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data: { car: newCar },
    });
});
exports.updateCar = catchAsync(async (req, res, next) => {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!car) {
        return next(new AppError('No car found with that id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { car },
    });
});
exports.deleteCar = catchAsync(async (req, res, next) => {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
        return next(new AppError('No car found with that id', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
