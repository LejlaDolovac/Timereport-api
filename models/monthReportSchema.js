let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MonthSchema = new Schema({
    userId: String,
    date: Date,
    comment: String,
    workedHoursMonth: Number
});

let CountingMonthly = mongoose.model('CountingMonthly', MonthSchema);


module.exports = CountingMonthly;

