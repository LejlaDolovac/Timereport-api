let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    userId: String,
    time: Number,
    date: Date,
    comment: String


});

let UserInformation = mongoose.model('UserInformation', UserSchema);


module.exports = UserInformation;


// Skapa user i mongodb
// Läsa user från mongodb

// Med axios ska du använda din GET metod för att läsa datan