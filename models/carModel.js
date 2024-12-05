const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: [true, 'A car must have a brand'],
            unique: true,
            trim: true,
        },
        model: {
            type: String,
            required: [true, 'A car must have a model'],
            unique: true,
            trim: true,
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A car must have a price'],
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (val) {
                    // this only points to current doc on NEW document creation, Does Not work with update
                    return val < this.price;
                },
                message:
                    'Discount price ({VALUE}) should be below regular price',
            },
        },
        imageCover: {
            type: String,
            required: [true, 'A car must have a cover image'],
        },
        images: [String],
        factoryDate: {
            type: Date,
            required: [true, 'A car must have a factory date!'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual populate
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'car',
    localField: '_id',
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
