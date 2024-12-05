const Car = require('../models/carModel');
const factory = require('./handlerFactory');

exports.getAllCars = factory.getAll(Car);
exports.getCar = factory.getOne(Car, { path: 'reviews' });
exports.addCar = factory.createOne(Car);
exports.updateCar = factory.updateOne(Car);
exports.deleteCar = factory.deleteOne(Car);
