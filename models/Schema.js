let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    userId: String,
    time: Number,
    date: Date,
    comment: String,
    googleID: String


});

let UserInformation = mongoose.model('UserInformation', UserSchema);


module.exports = UserInformation;


