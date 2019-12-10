let UserInformation = require('../models/Schema');

module.exports.get = async(req, res) => {
  console.log('get');

    try {
        let User = await UserInformation.find({});  
        res.status(200).send(User);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.post = async(req, res, err) => {
    console.log('post');
    try {
        let UserInformation = req.body;
        let resp = await UserInformation.create(UserInformation);
        res.status(200).send(resp);
        
    } catch(err) {
        res.status(400).send(err.stack , 'The data wasent load');
    }
};
