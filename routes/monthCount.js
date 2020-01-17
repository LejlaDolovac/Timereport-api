let monthReportSchema = require('../models/monthReportSchema');

module.exports.get = async(req, res) => {

    try {
        let Month = await monthReportSchema.find({});  
        res.status(200).send(Month);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.post = async(req, res, err) => {
    console.log('post');
    try {
        let userData = req.body;
        let resp = await monthReportSchema.create(userData);
        res.status(200).send(resp);
        
    } catch(err) {
        res.status(400).send(err.stack , 'The data wasent load');
    }
};

