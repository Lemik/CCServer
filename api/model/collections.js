const mongoose =require('mongoose');

const collectionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    numberOfItems: {type: Number, require: true}
});

module.exports = mongoose.model('Collection',collectionSchema);