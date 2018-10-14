const mongoose = require('mongoose');

const coinSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    year: Number,
    nominal: Number,
    mint: String,
    description: String,
    imageA: String,
    imageB: String
});

module.exports = mongoose.model('Coin',coinSchema);